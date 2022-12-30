import {RootState} from "../store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ExampleState {
  exampleProp:string;
}

const initialState: ExampleState = {
  exampleProp:'im an example string',
}

export const exampleSlice = createSlice({
  name:'example',
  initialState,
  reducers:{
    setExample:(state, action:PayloadAction<{prop:string}>)=>{
      const {prop} = action.payload;
      state.exampleProp = prop;
    }
  }
})

export const {setExample} = exampleSlice.actions;

export const selectExample = (state:RootState)=>{}


export default exampleSlice.reducer;
