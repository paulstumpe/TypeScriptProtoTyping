import React, {CSSProperties} from "react";

export interface props {
  style : CSSProperties
  clickedHex:string;
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  setStartMove:  React.Dispatch<React.SetStateAction<boolean>>;
  setStartAttack:  React.Dispatch<React.SetStateAction<boolean>>;
  allowedToMove:boolean;
  allowedToAttack:boolean;
}

function StartMoveOrAttack({style,
                             clickedHex,
                             clearBoxState,
                             setStartMove,
                             setStartAttack,
                             allowedToMove,
                             allowedToAttack}:props) {
  const handleStartAttack = ()=>{
    clearBoxState(false);
    setStartAttack(true);
  }
  const handleStartMove = ()=>{
    clearBoxState(false);
    setStartMove(true);
  }
  const handleDismiss = ()=>{
    clearBoxState(false);
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
      <div><button onClick={handleDismiss}>dismiss</button></div>
    </div>
  );
}

export default StartMoveOrAttack;
