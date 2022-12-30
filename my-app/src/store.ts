import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counterSlice";
import unitsReducer from "./Views/hexagonBoard/unitsSlice";
import hexesReducer from "./hexSlice";
import uiReducer from "./uiSlice"

// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    units: unitsReducer,
    hexes: hexesReducer,
    ui:uiReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
