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

export interface PartialLabelProps {
  fillStyle?:CanvasFillStrokeStyles['fillStyle'];
  font?:CanvasTextDrawingStyles['font'];
  textAlign?:CanvasTextDrawingStyles['textAlign'];
  textBaseline?: CanvasTextDrawingStyles['textBaseline'];
  text?: string;
}
export interface HexLabelProps extends PartialLabelProps{
  layout:LayoutStruct,
  ctx:CanvasRenderingContext2D,
  hex:HexStruct,
}
const getPointSize =  (layout:LayoutStruct):number=>Math.round(0.5 * Math.min(Math.abs(layout.size.x), Math.abs(layout.size.y)))

function HexLabel( {layout, ctx, hex, fillStyle, font, textBaseline, text, textAlign}:HexLabelProps):void{
  const altText = HexUtility.hexLength(hex) === 0? "q,r,s" : (hex.q + "," + hex.r + "," + hex.s);
  const center = LayoutClass.hexToPixel(hex,layout);
  const render = ()=>{
    ctx.fillStyle = fillStyle ?fillStyle: colorForHexFont(hex);
    ctx.font = font ? font: `${getPointSize(layout)}px sans-serif`;
    ctx.textAlign = textAlign ? textAlign :  "center";
    ctx.textBaseline = textBaseline ? textBaseline: "middle";
    ctx.fillText(text ? text : altText, center.x, center.y);
  }
  render();
}

export default HexLabel
