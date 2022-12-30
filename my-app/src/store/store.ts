import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counterSlice";
import unitsReducer from "./slices/unitsSlice";
import hexesReducer from "./slices/hexSlice";
import uiReducer from "./slices/uiSlice"
import layoutReducer from "./slices/layoutSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    units: unitsReducer,
    hexes: hexesReducer,
    ui:uiReducer,
    layout:layoutReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
