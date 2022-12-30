import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {HydratedHex} from "../../store/slices/hexSlice";

const colorForHexFont =(hex:HexStruct) => {
  // Match the color style used in the main article
  if (hex.q === 0 && hex.r === 0 && hex.s === 0) {
    return "hsl(0, 50%, 0%)";
  } else if (hex.q === 0) {
    return "hsl(90, 70%, 35%)";
  } else if (hex.r === 0) {
    return "hsl(200, 100%, 35%)";
  } else if (hex.s === 0) {
    return "hsl(300, 40%, 50%)";
  } else {
    return "hsl(0, 0%, 50%)";
  }
}

function HexLabel(ctx:CanvasRenderingContext2D, layout:LayoutStruct, hex:HexStruct, content?:HydratedHex):void{
  if(hex.q ===-3 && hex.r===-7 && hex.s===10){
    // console.log(ctx);
  }
  const pointSize = Math.round(0.5 * Math.min(Math.abs(layout.size.x), Math.abs(layout.size.y)));
  const center = LayoutClass.hexToPixel(hex,layout);
  const render = ()=>{
    ctx.fillStyle = colorForHexFont(hex);
    ctx.font = `${pointSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let text = HexUtility.hexLength(hex) === 0? "q,r,s" : (hex.q + "," + hex.r + "," + hex.s)
    // if ( content && content.unit && content.unit && content.unit.name){
    //   text = content.unit.name
    // }
    if ( content && content.unit && content.unit.name){
      text = content.unit.name
    }

    ctx.fillText(text, center.x, center.y);
  }
  render();
}

export default HexLabel
