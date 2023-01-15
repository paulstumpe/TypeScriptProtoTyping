import React, {CSSProperties} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {selectHex} from "../../store/slices/hexSlice";
import HexUtility, {Orientation} from "../../utilities/HexGridClasses/HexClass";
import {HydratedUnit, selectUnit} from "../../store/slices/unitsSlice";
import {selectTurn} from "../../store/slices/gameSlice";
import {getSelectedHex, setSelectedHex} from "../../store/slices/uiSlice";
import {generateAttackResults} from "../../ProtoType Mechanics/validateAttack";
import {attackAction} from "../../store/MultiSliceActions";

export interface props {
  style : CSSProperties
  clickedHexId:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  unit:HydratedUnit;
}

function ConfirmAttack({style, clickedHexId, clearBoxState, unit}:props) {
  const targetHex = useAppSelector((state)=>selectHex(state,HexUtility.hexFromId(clickedHexId)))
  const attackerHex = useAppSelector(getSelectedHex);
  const currentTurn = useAppSelector(selectTurn)
  const targetId = targetHex.unit?.id;
  const attackerId = unit.id
  let attacker = useAppSelector(state=>selectUnit(state,attackerId));
  let target = useAppSelector(state=>selectUnit(state,targetId));
  const dispatch = useAppDispatch();

  const handleAttack = ()=>{
    if(targetId ===undefined || attackerHex ===undefined || attacker===undefined || target===undefined){
      console.log('required target or attacker or hex undefined')
      throw new DOMException('somehow in confirm attack targetunitid was not defined')
    }

    let attackResult = generateAttackResults({attacker , target, currentTurn, targetHex, attackerHex});
    const {attackerDirection,
      turnAttacked,
      attackerHp,
      targetHp,
      rngArr,
    } = attackResult;
    dispatch(attackAction({
      attackerId,
      targetId,
      targetHp,
      attackerHp,
      attackerDirection,
      turnAttacked,
      rngArr,
    }));
    //todo remove from board if killed by making extra reducer for hexes and attack.

    //clear box selection
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
