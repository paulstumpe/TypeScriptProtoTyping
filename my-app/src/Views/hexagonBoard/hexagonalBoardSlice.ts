// import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
// import type { RootState} from "../../store";
//
//
// interface Hex {
//   xCoordinate: number,
//   yCoordinate: number,
//   zCoordinate: number,
// }
// interface Column {
//   hexes: Hex[]
// }
// interface Rows {
//   columns : Column[],
// }
// // Define a type for the slice state
// interface BoardState {
//   columns : [],
//   rows : [],
// }
//
// // Define the initial state using that type
// const initialState: BoardState = [
//   {
//
//   }
// ]
//
// export const unitsSlice = createSlice({
//   name: 'units',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     increment: (state, action: PayloadAction<{unitID:string, value:number}>) => {
//       let unit = state.find(unit=>unit.id===action.payload.unitID)
//       if (unit){
//         // unit.value++;
//       }
//     },
//   },
// })
//
// export const { increment } = unitsSlice.actions
//
// // Other code such as selectors can use the imported `RootState` type
// // export const selectUnit = (state: RootState) => state.counter.value
// export const selectUnit = (state: RootState, unitID: string) => state.units.find(unit=>unitID===unit.id);
// export const selectAllUnits = (state: RootState) => state.units;
//
// export default unitsSlice.reducer

export {}
