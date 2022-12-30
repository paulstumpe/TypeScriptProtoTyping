import EndTurnButton from "./EndTurnButton";
import React from "react";
import {useAppSelector, useAppDispatch } from "../../reduxCustomHooks";
import {selectAllUnitIds, selectAllUnits, selectUnit} from "../../store/slices/unitsSlice";
import {increment} from "../../store/slices/counterSlice";
import {shallowEqual} from "react-redux";
import UnitViewThing from "./UnitViewThing";
import SelectedHex from "./SelectedHex";
import {getSelectedHex} from "../../store/slices/uiSlice";

function BottomBar() {
  let counter = useAppSelector((state) => state.counter.value);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
  let selectedHex = useAppSelector(getSelectedHex);
  const dispatch = useAppDispatch()


  return (
        <div>
          <div>{counter}</div>
          <button
            onClick={()=>dispatch(increment())}
          >
            increment value
          </button>
          {selectedHex && <SelectedHex hex={selectedHex}/>}
          <EndTurnButton endTurn={()=>{console.log('todo endturn')}}/>
          {unitIds.map(unitID=>
            <UnitViewThing unitID={unitID}></UnitViewThing>
          )}
        </div>

    );
}

export default BottomBar;
