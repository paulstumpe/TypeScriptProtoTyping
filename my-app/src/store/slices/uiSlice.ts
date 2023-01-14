import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {HydratedHex, selectHexById, Terrains} from "./hexSlice";
import {BaseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";

export interface UiState {
  selectedHex?: string,
  mousedHex?: string,
  painterMode: boolean
  painterModeIsTerrain: boolean,
  painterModeBrushUnit: BaseUnits
  painterModeBrushTerrain: Terrains

}
const initialState: UiState = {
  selectedHex: undefined,
  mousedHex: undefined,
  painterMode:false,
  painterModeIsTerrain: false,
  painterModeBrushUnit: "brigandlvl1",
  painterModeBrushTerrain: "grass",
}
export const uiSlice = createSlice({
  name:'ui',
  initialState,
  reducers: {
    setSelectedHex: (state, action: PayloadAction<{hexId?:string}>)=>{
      if(action.payload.hexId===undefined){
        state.selectedHex=undefined;
      }
      state.selectedHex = action.payload.hexId;
    },
    setMousedHex: (state, action: PayloadAction<{hexId:string}>)=>{
      state.mousedHex = action.payload.hexId;
    },
    setPaintMode:(state, action:PayloadAction<boolean>)=>{
      state.painterMode = action.payload
    },
    setPaintBrush:(state, action:PayloadAction<{
      terrain?:Terrains,
      unit?:BaseUnits,
    }>)=>{
      const {terrain, unit} = action.payload
      if(terrain){
        state.painterModeIsTerrain = true;
        state.painterModeBrushTerrain = terrain;
      }
      if(unit){
        state.painterModeIsTerrain = false;
        state.painterModeBrushUnit = unit;
      }
    }
  }
})

export const getSelectedHex = (state:RootState):HydratedHex|undefined=>{
  if(!state.ui.selectedHex){
    return;
  }
  let hex =  selectHexById(state,state.ui.selectedHex)
  return hex;
}

export const getMousedHex = (state:RootState):HydratedHex|undefined=>{
  if(!state.ui.mousedHex){
    return;
  }
  let hex =  selectHexById(state,state.ui.mousedHex)
  return hex;
}

export const selectPaintSettings = (state:RootState)=>{
  const {painterMode,
    painterModeIsTerrain,
    painterModeBrushUnit,
    painterModeBrushTerrain} = state.ui;
  return {
    painterMode,
    painterModeIsTerrain,
    painterModeBrushUnit,
    painterModeBrushTerrain,
  }
}

export const {setSelectedHex, setMousedHex, setPaintMode, setPaintBrush} = uiSlice.actions;

export default uiSlice.reducer;
