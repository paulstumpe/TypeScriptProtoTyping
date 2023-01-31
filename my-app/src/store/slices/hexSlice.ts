import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {HydratedUnit, selectUnit} from "./unitsSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import {CSSProperties, useState} from "react";
import selectedHex from "../../Views/BelowBoard/SelectedHex";
import {getMousedHex, getSelectedHex} from "./uiSlice";
import HexClass from "../../utilities/HexGridClasses/HexClass";
import {WeaponType} from "../../ProtoType Mechanics/weapons";
import {Terrains} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";
import {attackAction} from "../MultiSliceActions";
import Fe7Calculator from "../../ProtoType Mechanics/combatSystems/fe7Calculator";



//define a type for the slice state
interface HexState {
  terrain?: Terrains,
  unit?: string,
  id: string,
}
interface HexesState {
  byId : {
    //has string keys that all point to hexstates
    [key: string]: HexState | undefined;
  };
  allIds : string[];
  verticalHexes : number;
  horizontalHexes : number;
}
export interface HydratedHex{
  unit?: HydratedUnit
  terrain?: Terrains,
  selected: boolean,
  moused: boolean,
  q: number
  r: number
  s: number
}
export interface HydratedHexWithUnit extends HydratedHex{
  unit: HydratedUnit
}

export interface HexDictionary {
  //has string keys that all point to hexstates
  [key: string]: HydratedHex | undefined;
}




const initialState: HexesState = {
  byId : {},
  allIds : [],
  // verticalHexes: 1,
  verticalHexes: 19,
  // horizontalHexes:1
  horizontalHexes:11
}

export const hexesSlice = createSlice({
  name: 'hexes',
  initialState,
  reducers: {
    setTerrain: (state, action: PayloadAction<{hex:HexStruct, terrain:Terrains}>)=>{
      const {hex, terrain} = action.payload;
      const hexId = HexUtility.hexIdFromHex(hex);
      let hexState = state.byId[hexId];

      //hex not created, add to dict
      if(!hexState){
        //create hex
        hexState = { id:hexId }
        //add to dict
        state.byId[hexId] = hexState;
        //add to list of all
        state.allIds.push(hexId);
      }

      //assign terrain
      hexState.terrain = terrain;
    },
    setUnit: (state, action:PayloadAction<{hex:HexStruct, unit:HydratedUnit}>)=>{
      const {hex, unit } = action.payload;
      const hexId = HexUtility.hexIdFromHex(hex);
      let hexState = state.byId[hexId]

      //hex not created, add to dict
      if(!hexState){
        //create hex
        hexState = { id:hexId }
        //add to dict
        state.byId[hexId] = hexState;
        //add to list of all
        state.allIds.push(hexId);
      }
      //hex not included on allIds, add
      if(!state.allIds.includes(hexId)){
        state.allIds.push(hexId);
      }
      hexState.unit = unit.id;
    },
    moveUnit:(state,action:PayloadAction<{hex:HexStruct, unit:HydratedUnit}>)=>{
      const {hex, unit} = action.payload;
      let newHex= hex;
      let oldHexStruct = internalSelectHexWithUnit(state,unit.id)
      if(oldHexStruct){
        let stateHex = state.byId[HexUtility.hexIdFromHex(oldHexStruct)];
        if(stateHex){
          stateHex.unit = undefined;
        }
      }

      //todo this is repeated code, should look up how to call a reducer within another reducer
      const hexId = HexUtility.hexIdFromHex(hex);
      let hexState = state.byId[hexId]

      //hex not created, add to dict
      if(!hexState){
        //create hex
        hexState = { id:hexId }
        //add to dict
        state.byId[hexId] = hexState;
        //add to list of all
        state.allIds.push(hexId);
      }
      //hex not included on allIds, add
      if(!state.allIds.includes(hexId)){
        state.allIds.push(hexId);
      }
      hexState.unit = unit.id;
    },
    setVerticalHexes:(state, action:PayloadAction<{vertical:number}>)=>{
      state.verticalHexes = action.payload.vertical;
    },
    setHorizontalHexes:(state, action:PayloadAction<{horizontal:number}>)=>{
      state.horizontalHexes = action.payload.horizontal
    },
  },
  extraReducers: (builder)=>{
    builder
      .addCase(attackAction, (state, action) => {
        const {fullAttackResults}=action.payload;
        let hexes =fullAttackResults.effects.unitIdsRemovedFromMap.map(unitId=>internalSelectHexWithUnit(state,unitId)).filter((targetHex):targetHex is HexStruct=>targetHex!==undefined);
        hexes.forEach(hex=>{
          let hexState = state.byId[HexUtility.hexIdFromHex(hex)];
          if(hexState){
            delete hexState.unit;
          }
        })

      })
      .addDefaultCase((state, action) => {})
  },
})

export const {setTerrain, setUnit, setVerticalHexes, setHorizontalHexes, moveUnit} = hexesSlice.actions;











/**                 SELECTORS                         **/
export const selectHexWithUnit = (state:RootState, unitId:string):HexStruct | undefined =>{
  return internalSelectHexWithUnit(state.hexes, unitId);
}

const internalSelectHexWithUnit = (state:RootState['hexes'], unitId:string):HexStruct|undefined=>{
  let hexId;
  for (let id in state.byId) {
    let unit = state.byId[id]?.unit
    if(unit===unitId){
      hexId=id;
    }
  }
  if(!hexId){
    return undefined;
  }
  return HexUtility.hexFromId(hexId);
}
export const selectAllHexIds = (state:RootState) => state.hexes.allIds;









// all below involve hydrated hexes
export const selectAllHexesWithState = (state:RootState):HexDictionary =>{
  let dictionary:HexDictionary = {}
  for (const hexId in state.hexes.byId) {
    dictionary[hexId] = selectHexById(state, hexId)
  }

  let selectedHex = getSelectedHex(state);
  if(selectedHex){
    let id = HexUtility.hexIdFromHex(selectedHex)
    if(!dictionary[id]){
      dictionary[id] = selectedHex;
    }
  }

  let mousedHex = getMousedHex(state);
  if(mousedHex){
    let id = HexUtility.hexIdFromHex(mousedHex)
    if(!dictionary[id]){
      dictionary[id] = mousedHex;
    }
  }

  return dictionary;
};

// export const selectHex = (state:RootState, id:string) => state.hexes.byId[id];

export const selectHexById = (state:RootState, id:string):HydratedHex=>{
  let hex = HexUtility.hexFromId(id);
  return selectHex(state, hex);
}

export const selectHex = (state:RootState, hex:HexStruct): HydratedHex => {
  let hexId = HexUtility.hexIdFromHex(hex)
  let hexState = state.hexes.byId[hexId];
  let selectedHex;
  if(state.ui.selectedHex){
    selectedHex=HexUtility.hexFromId(state.ui.selectedHex);
  }
  let mousedHex;
  if(state.ui.mousedHex){
    mousedHex=HexUtility.hexFromId(state.ui.mousedHex);
  }
  //create hydrated form
  let hydratedHex:HydratedHex = {
    //copy hexstruct coordinates
    selected:!!selectedHex && HexUtility.equalTo(selectedHex,hex),
    moused:!!mousedHex && HexUtility.equalTo(mousedHex,hex),
    ...hex
  };

  //populate
  if (hexState){
    hydratedHex.terrain= hexState.terrain;
    if (hexState.unit){
      hydratedHex.unit = selectUnit(state, hexState.unit);
    }
  }
  return hydratedHex;
}

export const selectVerticalHexes = (state:RootState):number=>state.hexes.verticalHexes;
export const selectHorizontalHexes = (state:RootState):number=>state.hexes.horizontalHexes;


/**
 * @param state
 * @return hex ids
 */
export const selectOccupiedHexes = (state:RootState):string[] => state.hexes.allIds.reduce<string[]>((prev,id)=>{
  let hex = selectHexById(state,id);
  if (hex && hex.unit){
    prev.push(id)
  }
  return prev;
},[])

export default hexesSlice.reducer;
