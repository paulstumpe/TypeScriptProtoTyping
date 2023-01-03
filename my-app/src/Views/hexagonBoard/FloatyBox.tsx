import React, {CSSProperties} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {HydratedHex, moveUnit} from "../../store/slices/hexSlice";
import {getSelectedHex} from "../../store/slices/uiSlice";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {setTurnMoved} from "../../store/slices/unitsSlice";

export interface props {
  style : CSSProperties
  clickedHex:string;
  setShowBox:  React.Dispatch<React.SetStateAction<boolean>>
}

function FloatyBox({style, clickedHex, setShowBox}:props) {
  let selectedHex = useAppSelector(getSelectedHex);

  const dispatch = useAppDispatch();

  const handleMove = ()=>{
    let hex = HexUtility.hexFromId(clickedHex);
    if(!!(selectedHex?.unit && selectedHex.selected)){
      dispatch(moveUnit({
        unit:selectedHex.unit,
        hex:hex
      }))
      dispatch(setTurnMoved({
        unitID:selectedHex.unit.id,
        turnMoved:selectedHex.unit.turnMoved+1
      }))
    }
    setShowBox(false);
  }


  return (
      <div style={style}>
        <div>context click box</div>
        <div><button onClick={handleMove}>move</button></div>
        <div><button>attack</button></div>
        <div><button>dismiss</button></div>
      </div>
  );
}

export default FloatyBox;
