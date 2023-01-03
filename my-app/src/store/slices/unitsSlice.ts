import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import type { RootState} from "../store";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {HydratedHex, selectAllHexesWithState, selectHex, selectHexWithUnit} from "./hexSlice";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {getSelectedHex} from "./uiSlice";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";

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
}

export interface HydratedUnit extends UnitState{

}
// Define the initial state using that type
const initialState: UnitState[] = [
  {
    hp: 10,
    id: nanoid(),
    name : 'JayZeeSnoCat',
    movement: 1,
    range: 1,
    turnAttacked:0,
    turnMoved:0,
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
    addUnit : {
      reducer(
        state,
        action: PayloadAction<UnitState, string>
      ) {
        state.push(action.payload)
      },
      prepare(name:string) {
        let newPayload:UnitState = {
          id: nanoid(),
          hp: 10,
          movement: 3,
          name: name +' ' + timesAdded++,
          range: 1,
          turnMoved:0,
          turnAttacked:0,
        }
        return {
          payload : newPayload,
        }
      },

    }

  },
})

export const { nameUnit, addUnit, setMovement, setHp, setRange, setTurnAttacked, setTurnMoved } = unitsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUnit = (state: RootState, unitID: string = ''):UnitState|undefined => {
  return state.units.find(unit => unitID === unit.id);
}
export const selectAllUnits = (state: RootState) => state.units;
export const selectAllUnitIds = (state: RootState) => state.units.map(unit=>unit.id);

export const selectAllAttackableHexesWithUnits = (state:RootState, attacker:HydratedUnit|undefined):HydratedHex[]=>{
  const attackableHexes:HydratedHex[] = [];
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
    if(hex && HexUtility.hexIsInArray(hex,hexesInRange)){

      differentHexFromAttacker && attackableHexes.push(selectHex(state,hex));

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





export default unitsSlice.reducer
