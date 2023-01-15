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
  },
  extraReducers: (builder) => {
    builder
      // .addCase(incrementBy, (state, action) => {
        // action is inferred correctly here if using TS
      // })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      // .addCase(decrement, (state, action) => {})
      // You can match a range of action types
      // .addMatcher(
      //   isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        // (state, action) => {}
      // )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
})

export const {setExample} = exampleSlice.actions;

export const selectExample = (state:RootState)=>{}


export default exampleSlice.reducer;
