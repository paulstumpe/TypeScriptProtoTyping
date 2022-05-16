import axios from "axios";
import EndTurnButton from "./EndTurnButton";
import endTurn from "../Game Entities/endTurn";
import {boardSettings} from "./hexagonBoard/hexagonBoardTypes";
import React from "react";
import {SetBoardSettings} from "../App";
import SettingsView from "./SettingsView";
import {useAppSelector, useAppDispatch } from "../reduxCustomHooks";
import {increment} from "../counterSlice";

type props = {
  boardSettings: boardSettings,
  setBoardSettings: SetBoardSettings,
}

function BottomBar({boardSettings, setBoardSettings}:props) {
  let counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch()


  return (
        <div>
          <div>{counter}</div>
          <button
            onClick={()=>dispatch(increment())}
          >
            increment value
          </button>
          <EndTurnButton endTurn={endTurn}/>
          <SettingsView boardSettings={boardSettings} setBoardSettings={setBoardSettings} />

        </div>

    );
}

export default BottomBar;
