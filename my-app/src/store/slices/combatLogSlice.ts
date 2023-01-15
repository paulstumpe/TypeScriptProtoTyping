import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface CombatLogState {
  logs:string[];
}

const initialState: CombatLogState = {
  logs:[],
}

export const combatLogSlice = createSlice({
  name:'combat',
  initialState,
  reducers:{
    pushLog:(state, action:PayloadAction<{log:string}>)=>{
      const {log} = action.payload;
      state.logs.push(log)
    },
    shiftLog:(state, action:PayloadAction<{log:string}>)=>{
      const {log} = action.payload;
      state.logs.push(log)
    },
  }
})

export const {pushLog, shiftLog} = combatLogSlice.actions;

export const selectCombatLogs = (state:RootState)=>{return state.combatLog.logs}


export default combatLogSlice.reducer;


// export default {}
