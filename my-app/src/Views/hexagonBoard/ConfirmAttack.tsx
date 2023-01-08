import React, {CSSProperties} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {selectHex} from "../../store/slices/hexSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {attack, HydratedUnit} from "../../store/slices/unitsSlice";
import {selectTurn} from "../../store/slices/gameSlice";
import {getSelectedHex, setSelectedHex} from "../../store/slices/uiSlice";

export interface props {
  style : CSSProperties
  clickedHexId:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  unit:HydratedUnit;
}

function ConfirmAttack({style, clickedHexId, clearBoxState, unit}:props) {
  const clickedHex = useAppSelector((state)=>selectHex(state,HexUtility.hexFromId(clickedHexId)))
  const selectedHex = useAppSelector(getSelectedHex);
  const currentTurn = useAppSelector(selectTurn)
  const targetUnit = clickedHex.unit;
  const dispatch = useAppDispatch();
  const handleAttack = ()=>{
    if(targetUnit?.id && selectedHex){

      dispatch(attack({attackerId:unit.id,targetId:targetUnit.id, currentTurn,targetHex:clickedHex, attackerHex:selectedHex}))
    } else {
      throw new DOMException('somehow in confirm attack targetunitid was not defined')
    }
    dispatch(setSelectedHex({}));
    clearBoxState(false);
  }
  const handleDismiss = ()=>{
    dispatch(setSelectedHex({}));
    clearBoxState(false);
  }

  return (
    <div style={style}>
      <div>confirm attack</div>
      <div><button onClick={handleAttack}>attack</button></div>
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default ConfirmAttack;
