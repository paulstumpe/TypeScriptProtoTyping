import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {stat} from "fs";

export interface Player {
  id:string;
  lastTurnEnded:number;
  name?:string;
}


export interface  PlayersState {
  byId : {
    [key: string]: Player | undefined;
  };
  allIds: string[],
  primaryPlayer: string,
}

const startingId = nanoid();
export const enemyId = nanoid();
const initialState: PlayersState = {
  byId:{
    [startingId]: {
      id:startingId,
      lastTurnEnded: 0,
      name:'player',
    },
    [enemyId]: {
      id:enemyId,
      lastTurnEnded: 0,
      name:'enemy',
    }
  },
  allIds: [startingId, enemyId],
  primaryPlayer: startingId,
}
export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setLastTurnEnded: (state, action:PayloadAction<{playerId:string, turn:number}>)=>{
      const {playerId, turn} = action.payload
      let player = state.byId[playerId];
      if(player){
        player.lastTurnEnded = turn;
      }
    },
  },
})

export const {setLastTurnEnded} = playersSlice.actions;

export const selectPrimaryPlayer =(state:RootState):Player=>{
  let primaryPlayerId = state.players.primaryPlayer;
  let primaryPlayer = state.players.byId[primaryPlayerId]
  if(!primaryPlayer){
    throw new Error('no primaryPlayer in playersSliceReducer');
  }
  return primaryPlayer;
}

export const selectPlayersWithUnfinishedTurn = (state:RootState):Player[]=>{
  let gameTurn = state.game.turn;
  return selectAllPlayers(state).filter(player=>player.lastTurnEnded<gameTurn)
}
export const selectAllPlayers = (state:RootState):Player[]=>{
  const playersWithUnfinishedTurn:Player[] = [];
  for (const id in state.players.byId) {
    let player = state.players.byId[id];
    if(!player){
      throw new Error('somehow player undefined in for in loop of selectPlayerswithUnfinishedTurn');
    }
    playersWithUnfinishedTurn.push(player);
  }
  return playersWithUnfinishedTurn;
}


export default playersSlice.reducer;
