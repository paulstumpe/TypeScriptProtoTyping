import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {HydratedHex, selectHexById} from "./hexSlice";

export interface UiState {
  selectedHex?: string,
  mousedHex?: string,

}
const initialState: UiState = {
  selectedHex: undefined,
  mousedHex: undefined,
}
export const uiSlice = createSlice({
  name:'ui',
  initialState,
  reducers: {
    setSelectedHex: (state, action: PayloadAction<{hexId:string}>)=>{
      state.selectedHex = action.payload.hexId;
    },
    setMousedHex: (state, action: PayloadAction<{hexId:string}>)=>{
      state.mousedHex = action.payload.hexId;
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

export const {setSelectedHex, setMousedHex} = uiSlice.actions;

export default uiSlice.reducer;
