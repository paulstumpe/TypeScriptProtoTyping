import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counterSlice";
import unitsReducer from "./Views/hexagonBoard/unitsSlice";
// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    units: unitsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
