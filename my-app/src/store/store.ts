import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/counterSlice";
import unitsReducer from "./slices/unitsSlice";
import hexesReducer from "./slices/hexSlice";
import uiReducer from "./slices/uiSlice"
import layoutReducer from "./slices/layoutSlice"
import gameReducer from "./slices/gameSlice"
import playersReducer from "./slices/playersSlice"
// import combatLogReducer from "./slices/combatLogSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    units: unitsReducer,
    hexes: hexesReducer,
    ui:uiReducer,
    layout:layoutReducer,
    game:gameReducer,
    players:playersReducer,
    // combatLog:combatLogReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
