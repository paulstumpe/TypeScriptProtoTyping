import LayoutClass, {LayoutStruct, makePoint, PointStruct} from "../../Hexagonal/Board/LayoutClass";
import HexUtility from "../../Hexagonal/Hex/HexClass";

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
