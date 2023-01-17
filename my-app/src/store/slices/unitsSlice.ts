import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import type { RootState} from "../store";
import HexUtility, {Orientation} from "../../utilities/HexGridClasses/HexClass";
import { HydratedHexWithUnit, selectAllHexesWithState, selectHex, selectHexWithUnit} from "./hexSlice";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import {basesDict, BaseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";
import Fe7Calculator from "../../ProtoType Mechanics/combatSystems/fe7Calculator";
import {attackAction} from "../MultiSliceActions";
import {isHexWithUnit} from "./unitSliceTypePredicateFunctions";

// Define a type for the slice state

interface UnitState {
  hp: number;
  id : string;
  movement : number;
  // this should be the id of the hex this unit is occupying, if any
  name? : string;
  range : number,
  turnMoved:number,
  turnAttacked:number,
  player?:string,
  // attack:number,
  orientation:Orientation,
  // maxHp:number;
  unitToInherit:BaseUnits
}

export interface HydratedUnit extends UnitState{

}
// Define the initial state using that type
const initialState: UnitState[] = [
  {
    hp: basesDict.Oswin.hp,
    id: nanoid(),
    name : basesDict.Oswin.name,
    movement: basesDict.Oswin.move,
    range: 1,
    turnAttacked:0,
    turnMoved:0,
    // attack:1,
    orientation:0,
    // maxHp:10,
    unitToInherit:basesDict.Oswin.name,
  }
]
let timesAdded = 0;
export const unitsSlice = createSlice({
  name: 'units',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nameUnit: (state, action: PayloadAction<{unitID:string, name:string}>) => {
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.name = action.payload.name;
      }
    },
    setMovement : (state, action: PayloadAction<{unitID:string, movement:number}>)=>{
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.movement = action.payload.movement;
      }
    },
    setHp : (state, action:PayloadAction<{unitID:string, hp:number}>)=>{
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.hp = action.payload.hp;
      }
    },
    setRange : (state, action:PayloadAction<{unitID:string, range:number}>)=>{
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.range = action.payload.range;
      }
    },
    setTurnMoved : (state, action:PayloadAction<{unitID:string, turnMoved:number}>)=>{
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.turnMoved = action.payload.turnMoved;
      }
    },
    setTurnAttacked : (state, action:PayloadAction<{unitID:string, turnAttacked:number}>)=>{
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.turnAttacked = action.payload.turnAttacked;
      }
    },
    setUnitsPlayer : (state, action:PayloadAction<{unitId:string, playerId:string}>)=>{
      const {unitId, playerId} = action.payload
      let unit = state.find(unit=>unit.id===unitId)
      if(unit){
        unit.player= playerId;
      }
    },
    setUnitsOrientation: (state, action:PayloadAction<{unitId:string, orientation:Orientation}>)=>{
      const {unitId, orientation} = action.payload
      let unit = state.find(unit=>unit.id===unitId)
      if(unit){
        unit.orientation=orientation;
      }
    },
    setUnitsOrientationUsingFacingHex:(state, action:PayloadAction<{unitId:string, unitHex:HexStruct, targetHex:HexStruct}>)=>{
      const {unitId, unitHex, targetHex} = action.payload;
      if(HexUtility.equalTo(unitHex,targetHex)){
        throw new Error('tried to set a hexes orientation using its own hex and no neightbors');
      }
      let direction = HexUtility.getOrientationFacingTargetHex(unitHex,targetHex)
      let unit = state.find(unit=>unit.id===unitId)
      if(unit){
        unit.orientation=direction;
      }
    },
    addUnit : {
      reducer(
        state,
        action: PayloadAction<UnitState, string>
      ) {
        state.push(action.payload)
      },
      prepare(base:BaseUnits) {
        let newPayload:UnitState = {
          id: nanoid(),
          hp: basesDict[base].hp,
          movement: basesDict[base].move,
          name: basesDict[base].name +' ' + timesAdded++,
          range: 1,
          turnMoved:0,
          turnAttacked:0,
          // attack:1,
          orientation:0,
          // maxHp:10,
          unitToInherit:basesDict[base].name
        }
        return {
          payload : newPayload,
        }
      },
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(attackAction, (state, action) => {
        const {attackerId, targetId, attackerDirection,turnAttacked, fullAttackResults}=action.payload;
        let attacker = state.find(unit=>unit.id===attackerId);
        let target = state.find(unit=>unit.id===targetId);
        if(!attacker || !target){
          throw new Error('attacker or target provided had no match in state')
        }
        attacker.orientation = attackerDirection;
        attacker.turnAttacked = turnAttacked;
        let hp = Fe7Calculator.hpAfterAllAttacks(fullAttackResults, attacker,target)
        attacker.hp = hp.attackerHp;
        target.hp = hp.targetHp;
      })
      .addDefaultCase((state, action) => {})
  },
})

export const { nameUnit, addUnit, setMovement, setHp, setRange, setTurnAttacked, setTurnMoved, setUnitsPlayer, setUnitsOrientation, setUnitsOrientationUsingFacingHex } = unitsSlice.actions






// Other code such as selectors can use the imported `RootState` type
export const selectUnit = (state: RootState, unitID: string = ''):UnitState|undefined => {
  return state.units.find(unit => unitID === unit.id);
}
export const selectAllUnits = (state: RootState):UnitState[] => {
  return state.units
};
export const selectAllUnitIds = (state: RootState) => state.units.map(unit=>unit.id);



export const selectAllAttackableHexesWithUnits = (state:RootState, attacker:HydratedUnit|undefined):HydratedHexWithUnit[]=>{
  const attackableHexes:HydratedHexWithUnit[] = [];
  if (!attacker){
    return attackableHexes;
  }
  let allUnits = selectAllUnits(state);

  const attackerHex = selectHexWithUnit(state, attacker.id);

  if(!attackerHex){
    return attackableHexes;
  }

  let hexesInRange = selectAttackableHexes(state,attacker)

  allUnits.forEach((unit)=>{
    let hex = selectHexWithUnit(state,unit.id)
    let differentHexFromAttacker = hex && !HexUtility.equalTo(hex,attackerHex)
    let differentPlayerFromAttacker = attacker.player !== unit.player
    if(hex && HexUtility.hexIsInArray(hex,hexesInRange)){
      const hydratedHex = selectHex(state,hex);
      if (isHexWithUnit(hydratedHex)) {
        differentHexFromAttacker && differentPlayerFromAttacker && attackableHexes.push(hydratedHex);
      } else {
        throw new Error('select all attackable hexes with units somehow tried to return a hex without a unit')
      }

    }
  })

  return attackableHexes;
}

export const selectAttackableHexes = (state:RootState, attacker:HydratedUnit|undefined):HexStruct[]=>{
  let attackableHexes:HexStruct[] = [];
  if(!attacker){
    return attackableHexes
  }
  let hex = selectHexWithUnit(state,attacker.id)
  if(hex && attacker){
    let range = attacker.range
    attackableHexes = PathFinding.attackableFromHex(hex,range);
  }

  return attackableHexes
}

export const selectHexesAttackableAfterMove = (state:RootState, unit:HydratedUnit|undefined):HexStruct[]=>{
  if(!unit){
    return [];
  }
  //todo bug when movement is zero, this shows no attackable hexes, but should still show base attackable hexes
  let movableArr = selectMovable(state, unit);
  return PathFinding.attackableFromArrayOfHexes(movableArr, unit.range);
}


export const selectMovable = (state:RootState, unit:HydratedUnit|undefined):HexStruct[]=>{
  //i need to use layout to get width and height, and need to use width and height to reject hexes
  let vertical = state.hexes.verticalHexes
  let horizontal = state.hexes.horizontalHexes
  let arr:HexStruct[] =[];
  if(!unit){
    return arr
  }
  const hex= selectHexWithUnit(state,unit.id)
  if(!hex){
    return arr;
  }
  const hexesWithState = selectAllHexesWithState(state);
  arr = PathFinding.getMovable(unit, hex,hexesWithState, horizontal, vertical);
  return arr;
}

export const selectAllUnitsBelongingToPlayerId = (state:RootState, playerId:string):UnitState[]=>{
  const allUnits = selectAllUnits(state);
  const allUnitsBelongingToPlayer = allUnits.filter(unit=>unit.player===playerId);
  return allUnitsBelongingToPlayer;
}





export default unitsSlice.reducer
