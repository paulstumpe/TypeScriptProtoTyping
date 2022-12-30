import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import HexLabel, {PartialLabelProps} from "./HexLabel";

export interface renderHexProps {
  context: CanvasRenderingContext2D;
  strokeStyle?:CanvasFillStrokeStyles["strokeStyle"];
  fillStyle?:CanvasFillStrokeStyles["fillStyle"];
  hex: HexStruct;
  layout:LayoutStruct;
  labelProps?: PartialLabelProps,
}

const renderHex = ({context, hex, layout, strokeStyle='black', fillStyle='white', labelProps={}}:renderHexProps)=>{
  let corners = LayoutClass.polygonCorners(hex,layout)
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.fillStyle = fillStyle;
  context.lineWidth = 1;
  context.moveTo(corners[5].x, corners[5].y);
  for (let i = 0; i < 6; i++) {
    context.lineTo(corners[i].x, corners[i].y);
  }
  context.fill();
  context.stroke();
  HexLabel({
    layout,
    ctx:context,
    hex,
    ...labelProps
  });
}
export default renderHex
