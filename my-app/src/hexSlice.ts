import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store";
import {HydratedUnit, selectUnit} from "./Views/hexagonBoard/unitsSlice";
import HexUtility from "./utilities/HexGridClasses/HexClass";
import {HexStruct} from "./utilities/HexGridClasses/Structs/Hex";

//define a type for the slice state
interface HexState {
  terrain?: string,
  unit?: string,
  id: string,
}
interface HexesState {
  byId : {
    //has string keys that all point to hexstates
    [key: string]: HexState | undefined;
  },
  allIds : string[]
}
export interface HydratedHex{
  unit?: HydratedUnit
  terrain?: string
  q: number
  r: number
  s: number
}

const initialState: HexesState = {
  byId : {},
  allIds : [],
}

export const hexesSlice = createSlice({
  name: 'hexes',
  initialState,
  reducers: {
    setTerrain: (state, action: PayloadAction<{hex:HydratedHex, terrain:string}>)=>{
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
    setUnit: (state, action:PayloadAction<{hex:HydratedHex, unit:HydratedUnit}>)=>{
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
  }
})

export const {setTerrain, setUnit} = hexesSlice.actions;

export const selectAllHexIds = (state:RootState) => state.hexes.allIds;

// export const selectHex = (state:RootState, id:string) => state.hexes.byId[id];

export const selectHexById = (state:RootState, id:string)=>{
  let hex = HexUtility.hexFromId(id);
  return selectHex(state, hex);
}

export const selectHex = (state:RootState, hex:HexStruct): HydratedHex => {
  let hexId = HexUtility.hexIdFromHex(hex)
  let hexState = state.hexes.byId[hexId];
  //create hydrated form
  let hydratedHex:HydratedHex = {
    q: 0,
    r: 0,
    s: 0,
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

export const selectOccupiedHexes = (state:RootState) => state.hexes.allIds.reduce<string[]>((prev,id)=>{
  let hex = selectHexById(state,id);
  if (hex && hex.unit){
    prev.push(id)
  }
  return prev;
},[])

export default hexesSlice.reducer;
