import React, {CSSProperties} from "react";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
}

function AddUnitOrTerrain({style, clickedHex, clearBoxState}:props) {

  const addUnit = ()=>{

  }
  const addTerrain = ()=>{

  }
  const handleDismiss = ()=>{
    clearBoxState(false);
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
