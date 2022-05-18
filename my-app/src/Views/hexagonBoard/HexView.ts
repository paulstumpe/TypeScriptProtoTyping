import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexLabel from "./HexLabel";

 const HexView = (
  context:CanvasRenderingContext2D,
  layout:LayoutStruct,
  hex: HexStruct,
  label?: boolean,
  strokeStyle='black',
  fillStyle ='white',
)=>{
   let corners = LayoutClass.polygonCorners(hex,layout)
   const render =()=>{
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
     if (label) HexLabel(context, layout, hex);
   }
   render();

}
export default HexView
