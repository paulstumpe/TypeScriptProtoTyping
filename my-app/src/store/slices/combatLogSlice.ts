import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {attackAction} from "../MultiSliceActions";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(attackAction, (state, action) => {

        // action is inferred correctly here if using TS
        const {attackerHp, targetHp, } = action.payload
        state.logs.push(`attacked and target was left with ${targetHp}.`);
      })
    //   // You can chain calls, or have separate `builder.addCase()` lines each time
    //   .addCase(decrement, (state, action) => {})
    //   // You can match a range of action types
    //   .addMatcher(
    //     isRejectedAction,
    //     // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
    //     (state, action) => {}
    //   )
    //   // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
})

export const {pushLog, shiftLog} = combatLogSlice.actions;

export const selectCombatLogs = (state:RootState)=>{return state.combatLog.logs}


export default combatLogSlice.reducer;


// export default {}
