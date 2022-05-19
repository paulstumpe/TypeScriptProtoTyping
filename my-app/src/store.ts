import { configureStore } from '@reduxjs/toolkit'
import unitsReducer from "./Units/unitsSlice";
import hexagonBoardReducer from "./Hexagonal/hexagonBoard/hexagonBoardSlice";
// ...

export const store = configureStore({
  reducer: {
    units: unitsReducer,
    hexagonBoard: hexagonBoardReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
