import React, {CSSProperties} from "react";
import {useDispatch} from "react-redux";
import {moveUnit} from "../../store/slices/hexSlice";
import {HydratedUnit, selectUnit, setTurnMoved} from "../../store/slices/unitsSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {selectTurn} from "../../store/slices/gameSlice";
import {setSelectedHex} from "../../store/slices/uiSlice";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  unit:HydratedUnit
}

function ConfirmMove({style, clickedHex, clearBoxState, unit}:props) {
  const turn = useAppSelector(selectTurn)
  const dispatch = useAppDispatch();
  const handleMove = ()=>{
  //should dispatch a move command
    dispatch(moveUnit({
      hex:HexUtility.hexFromId(clickedHex),
      unit
    }))
    dispatch(setTurnMoved({
      unitID:unit.id,
      turnMoved: turn,
    }))
    dispatch(setSelectedHex({}));
    clearBoxState(false);
  }
  const handleDismiss = ()=>{
    dispatch(setSelectedHex({}));
    clearBoxState(false);
  }

  return (
    <div style={style}>
      <div>confirm move</div>
      <div><button onClick={handleMove}>Move</button></div>
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default ConfirmMove;
