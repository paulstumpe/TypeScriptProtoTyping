import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexLabel from "./HexLabel";
import {HydratedHex} from "../../hexSlice";

 const HexView = (
  context:CanvasRenderingContext2D,
  layout:LayoutStruct,
  hex: HexStruct,
  label?: boolean,
  strokeStyle='black',
  fillStyle ='white',
  content?: HydratedHex,
)=>{
   let corners = LayoutClass.polygonCorners(hex,layout)
   const render =()=>{
     context.beginPath();
     context.strokeStyle = strokeStyle;
     context.fillStyle = fillStyle;
     context.lineWidth = 1;
       if(hex.q ===-3 && hex.r===-7 && hex.s===10){
           // console.log(corners[5].x, corners[5].y)
       }
       if(hex.q ===-11 && hex.r===-4 && hex.s===-15){
           // console.log(corners[5].x, corners[5].y)
       }
     context.moveTo(corners[5].x, corners[5].y);
     for (let i = 0; i < 6; i++) {
       context.lineTo(corners[i].x, corners[i].y);
     }
     context.fill();
     context.stroke();
       if(hex.q ===-3 && hex.r===-7 && hex.s===10){
           // console.log(corners[5].x, corners[5].y)
       }
       if(content && label){
         HexLabel(context, layout, hex, content);
       } else if (label) {
         HexLabel(context, layout, hex);
       }
   }
   render();

}
export default HexView
