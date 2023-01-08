import React, {CSSProperties} from "react";
import {setSelectedHex} from "../../store/slices/uiSlice";
import {useDispatch} from "react-redux";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  setStartMove:  React.Dispatch<React.SetStateAction<boolean>>;
  setStartAttack:  React.Dispatch<React.SetStateAction<boolean>>;
  setStartOrient: React.Dispatch<React.SetStateAction<boolean>>;
  allowedToMove:boolean;
  allowedToAttack:boolean;
  allowedToOrient:boolean;
}

function StartUnitAction({
                           style,
                           clickedHex,
                           clearBoxState,
                           setStartMove,
                           setStartAttack,
                           allowedToMove,
                           allowedToAttack,
                           allowedToOrient,
                           setStartOrient,
                         }:props) {
  const dispatch = useDispatch();
  const handleStartAttack = ()=>{
    clearBoxState(false);
    setStartAttack(true);
  }
  const handleStartMove = ()=>{
    clearBoxState(false);
    setStartMove(true);
  }
  const handleDismiss = ()=>{
    dispatch(setSelectedHex({}));
    clearBoxState(false);
  }
  const handleOrientUnit = ()=>{
    clearBoxState(false);
    setStartOrient(true);
  }

  return (
    <div style={style}>
      <div>start move or start attack</div>
      {allowedToAttack &&
        <div><button onClick={handleStartAttack}>attack</button></div>
      }
      {allowedToMove &&
        <div><button onClick={handleStartMove}>move</button></div>
      }
      {allowedToOrient &&
          <div><button onClick={handleOrientUnit}>orient</button></div>
      }
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default StartUnitAction;
