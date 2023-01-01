import {MouseEvent, RefObject} from "react";
import useCanvas, {PostDraw, PreDraw, DrawCB} from "./CanvasHook";

interface props {
  draw: DrawCB,
  onClick: (e:MouseEvent, canvas:RefObject<HTMLCanvasElement>)=>void
  onMouseMove?: (e:MouseEvent, canvas:RefObject<HTMLCanvasElement>)=>void
  preDraw? : PreDraw
  postDraw?: PostDraw
  rest? : {},
}
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

const postDrawDefault = (context: CanvasRenderingContext2D, canvas:HTMLCanvasElement) => {
  context.restore()
}
/**
 * should attempt to resize canvas to the size of display
 * @param canvas
 */
const resizeCanvasToDisplaySize = (canvas:HTMLCanvasElement)=> {
  const { width, height } = canvas.getBoundingClientRect()
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    return true // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
  }
  return false
}

const preDrawDefault = (context: CanvasRenderingContext2D, canvas:HTMLCanvasElement) => {
  if (!context){
    return
  }
  context.save()
  resizeCanvasToDisplaySize(canvas)
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}

const Canvas = ({draw, onClick,  onMouseMove, postDraw=postDrawDefault, preDraw=preDrawDefault, rest = {}}:props)=>{
  const canvasRef = useCanvas(draw,{preDraw, postDraw})
  //could always pass in other things we need by having a rest props
  return <canvas
    onClick={(e)=>onClick(e, canvasRef)}
    ref={canvasRef}
    onMouseMove={(e)=>onMouseMove && onMouseMove(e,canvasRef)}
    {...rest}
    style={{width:'100%', height:'100%'}}
  />
}
export default Canvas;


//todo implement this if necessarry based on blog post
// export function resizeCanvas(canvas:HTMLCanvasElement) {
// }
