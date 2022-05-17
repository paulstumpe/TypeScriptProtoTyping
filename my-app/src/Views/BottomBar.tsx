import axios from "axios";
import EndTurnButton from "./EndTurnButton";
import endTurn from "../Game Entities/endTurn";
import {boardSettings} from "./hexagonBoard/hexagonBoardTypes";
import React from "react";
import {SetBoardSettings} from "../App";
import SettingsView from "./SettingsView";
import {useAppSelector, useAppDispatch } from "../reduxCustomHooks";
import {selectAllUnitIds, selectAllUnits, selectUnit} from "./hexagonBoard/unitsSlice";
import {increment} from "../counterSlice";
import {shallowEqual} from "react-redux";
import UnitViewThing from "./UnitViewThing";

type props = {
  boardSettings: boardSettings,
  setBoardSettings: SetBoardSettings,
}



function BottomBar({boardSettings, setBoardSettings}:props) {
  let counter = useAppSelector((state) => state.counter.value);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
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
          {unitIds.map(unitID=>
            <UnitViewThing unitID={unitID}></UnitViewThing>
          )}

        </div>

    );
}

export default BottomBar;
