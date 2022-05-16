import axios from "axios";
import EndTurnButton from "./EndTurnButton";
import endTurn from "../Game Entities/endTurn";
import {boardSettings} from "./hexagonBoard/hexagonBoardTypes";
import React from "react";
import {SetBoardSettings} from "../App";
import SettingsView from "./SettingsView";

type props = {
  boardSettings: boardSettings,
  setBoardSettings: SetBoardSettings,
}

function BottomBar({boardSettings, setBoardSettings}:props) {

    return (
        <div>
          <EndTurnButton endTurn={endTurn}/>
          <SettingsView boardSettings={boardSettings} setBoardSettings={setBoardSettings} />

        </div>

    );
}

export default BottomBar;
