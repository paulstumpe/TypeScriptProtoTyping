import {RootState} from "../store/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//extra reducers
// https://stackoverflow.com/a/73794913

// import {createAction} from "@reduxjs/toolkit"
// // we are gonna dispatch this
// export const resetAction=createAction("lists/reset")


// extraReducers(builder) {
//   builder.addCase(resetAction, (state, action) => {
//     state = [];
//   });
// },

// import {resetAction} from "./store/actions"
//
// const handleReset = () => {
//   dispatch(reset());
//   // I do not need to dispatch this
//   // dispatch(resetAction());
// };

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
