import LayoutClass, {LayoutStruct, makePoint, PointStruct} from "../../utilities/HexGridClasses/LayoutClass";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {RefObject} from "react";

/**
 * takes a mouseevent, and tells you what the canvas coordinates of that even were
 * @param canvas
 * @param nativeEvent
 */
export const clickToCanvas = (canvas:HTMLCanvasElement, nativeEvent:MouseEvent):PointStruct=>{
  const rect = canvas.getBoundingClientRect()
  const x = nativeEvent.clientX - rect.left
  const y = nativeEvent.clientY - rect.top
  return  makePoint(x,y);
}

export const getCanvas = (canvasRef:RefObject<HTMLCanvasElement>)=>{
  if(!canvasRef.current){
    throw new Error('canvasreference doesnt exist for some reason')
  }
  const canvas = canvasRef.current;
  return canvas;
}
