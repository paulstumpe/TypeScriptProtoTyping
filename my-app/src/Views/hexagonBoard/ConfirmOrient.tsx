import React, {CSSProperties} from "react";
import {useDispatch} from "react-redux";
import {HydratedUnit, setUnitsOrientation, setUnitsOrientationUsingFacingHex} from "../../store/slices/unitsSlice";
import {useAppSelector} from "../../store/reduxCustomHooks";
import {selectTurn} from "../../store/slices/gameSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectHexWithUnit} from "../../store/slices/hexSlice";
import HexClass from "../../utilities/HexGridClasses/HexClass";
import {setSelectedHex} from "../../store/slices/uiSlice";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  unit:HydratedUnit
}

function ConfirmOrient({style, clickedHex, clearBoxState, unit}:props) {
  const unitHex = useAppSelector(state=>selectHexWithUnit(state,unit.id))
  const dispatch = useDispatch();
  const handleOrient = ()=>{
    if(unitHex){
      dispatch(setUnitsOrientationUsingFacingHex({
        unitId: unit.id,
        unitHex:unitHex,
        targetHex:HexUtility.hexFromId(clickedHex)
      }))
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
      <div>confirm orient</div>
      <div><button onClick={handleOrient}>Orient</button></div>
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default ConfirmOrient;
