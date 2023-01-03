import EndTurnButton from "./EndTurnButton";
import React from "react";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {selectAllUnitIds} from "../../store/slices/unitsSlice";
import {increment} from "../../store/slices/counterSlice";
import {shallowEqual} from "react-redux";
import UnitViewThing from "./UnitViewThing";
import SelectedHex from "./SelectedHex";
import {getSelectedHex} from "../../store/slices/uiSlice";
import {endTurn, selectTurn} from "../../store/slices/gameSlice";

function BottomBar() {
  let turn = useAppSelector(selectTurn);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
  let selectedHex = useAppSelector(getSelectedHex);
  const dispatch = useAppDispatch()
  const handleEndTurn = ()=>{
    dispatch(endTurn());
  }

  return (
        <div style={{display:"flex"}}>
          <div title={'left column'}>
            <div>current turn:{turn}</div>
            <EndTurnButton  endTurn={handleEndTurn}/>
            {selectedHex && <SelectedHex hex={selectedHex}/>}
          </div>
          <div title={'right column'} style={{  marginLeft: 'auto'}}>
            <h2 style={{textAlign:'center'}}>unit list</h2>
            <div>
              {unitIds.map(unitID=>
                <UnitViewThing unitID={unitID}></UnitViewThing>
              )}
            </div>
          </div>
        </div>

    );
}

export default BottomBar;
