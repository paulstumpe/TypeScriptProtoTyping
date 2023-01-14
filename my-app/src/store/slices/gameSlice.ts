import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface GameState {
  turn:number,
  attackInProgress:boolean,
}

const initialState: GameState = {
  turn:1,
  attackInProgress:false,
}

export const gameSlice = createSlice({
  name:'game',
  initialState,
  reducers: {
    endTurn: (state) =>{
      state.turn ++;
    },
    beginAttack:(state)=>{
      state.attackInProgress=true;
    }
  }
})

export const {endTurn} = gameSlice.actions;

export const selectTurn = (state:RootState) => state.game.turn;

export default gameSlice.reducer



