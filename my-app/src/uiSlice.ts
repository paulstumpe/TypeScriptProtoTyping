import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "./store";
import {HydratedHex, selectHex, selectHexById} from "./hexSlice";

export interface UiState {
  selectedHex?: string,
}
const initialState: UiState = {
  selectedHex: undefined,
}
export const uiSlice = createSlice({
  name:'ui',
  initialState,
  reducers: {
    setSelectedHex: (state, action: PayloadAction<{hexId:string}>)=>{
      state.selectedHex = action.payload.hexId;
    }
  }
})

export const getSelectedHex = (state:RootState):HydratedHex|undefined=>{
  if(!state.ui.selectedHex){
    return;
  }
  return selectHexById(state,state.ui.selectedHex)
}

export const {setSelectedHex} = uiSlice.actions;

export default uiSlice.reducer;
