import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import type { RootState} from "../store";

// Define a type for the slice state
interface UnitState {
  value: number,
  id : string,
  // this should be the id of the hex this unit is occupying, if any
  name? : string,
}

export interface HydratedUnit extends UnitState{

}
// Define the initial state using that type
const initialState: UnitState[] = [
  {
    value: 1,
    id: nanoid(),
    name : 'JayZeeSnoCat'
  }
]

export const unitsSlice = createSlice({
  name: 'units',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{unitID:string, value:number}>) => {
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.value++;
      }
    },
    nameUnit: (state, action: PayloadAction<{unitID:string, name:string}>) => {
      let unit = state.find(unit=>unit.id===action.payload.unitID)
      if (unit){
        unit.name = action.payload.name;
      }
    },
    addUnit : {
      reducer(
        state,
        action: PayloadAction<UnitState, string>
      ) {
        state.push(action.payload)
      },
      prepare(name:string) {
        let newPayload:UnitState = {
          id: nanoid(),
          value: 1,
          name: name
        }
        return {
          payload : newPayload,
        }
      },

    }

  },
})

export const { nameUnit, addUnit } = unitsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUnit = (state: RootState, unitID: string = ''):UnitState|undefined => state.units.find(unit=>unitID===unit.id);
export const selectAllUnits = (state: RootState) => state.units;
export const selectAllUnitIds = (state: RootState) => state.units.map(unit=>unit.id);


export default unitsSlice.reducer
