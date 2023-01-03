import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface GameState {
  turn:number,
}

const initialState: GameState = {
  turn:1,
}

export const gameSlice = createSlice({
  name:'game',
  initialState,
  reducers: {
    endTurn: (state) =>{
      state.turn ++;
    }
  }
})

export const {endTurn} = gameSlice.actions;

export const selectTurn = (state:RootState) => state.game.turn;

export default gameSlice.reducer



