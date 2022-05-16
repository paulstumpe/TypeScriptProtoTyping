import {hexProps} from "./hexagonBoardTypes";
import hexCss from "./hexCss";
import {useState} from "react";
import isOdd from "../../utilities/isOdd";

export default function Hex ({hex, column, row, boardSettings}:hexProps){
  const {hexColor, pxUnit, vertical} = boardSettings;
  let hexStyles = hexCss(hexColor, pxUnit, vertical)

  const [clicked, setClicked] = useState(false);
  if (clicked){
    hexStyles = hexCss('blue', pxUnit, vertical)
  }
  const onClick = ()=>{
    console.log('clicked')
    setClicked(!clicked)
  }
  return (
    <div className={'hex'} style={isOdd(column)? hexStyles.hexEvenCss: hexStyles.hexOddCss}>
      <div onClick={onClick} style={hexStyles.topOfHexCss}/>
      <div onClick={onClick} style={hexStyles.middleOfHexCss}/>
      <div onClick={onClick} style={hexStyles.bottomOfHexCss}/>
    </div>
  );
}
