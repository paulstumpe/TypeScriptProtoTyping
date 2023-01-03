import React, {CSSProperties} from "react";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
}

function ConfirmAttack({style, clickedHex, clearBoxState}:props) {

  const handleAttack = ()=>{
    console.log('attacked! lol todo')
    clearBoxState(false);
  }
  const handleDismiss = ()=>{
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
