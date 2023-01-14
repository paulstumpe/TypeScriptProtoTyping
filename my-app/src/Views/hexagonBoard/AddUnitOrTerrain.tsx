import React, {CSSProperties} from "react";
import {setSelectedHex} from "../../store/slices/uiSlice";
import {useAppDispatch} from "../../store/reduxCustomHooks";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
}

function AddUnitOrTerrain({style, clickedHex, clearBoxState}:props) {
  const dispatch = useAppDispatch();
  const addUnit = ()=>{

  }
  const addTerrain = ()=>{

  }
  const handleDismiss = ()=>{
    clearBoxState(false);
    dispatch(setSelectedHex({}));
  }

  return (
    <div style={style}>
      <div>edit hex</div>
      <div><button onClick={addUnit}>unit</button></div>
      <div><button onClick={addTerrain}>terrain</button></div>
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default AddUnitOrTerrain;
