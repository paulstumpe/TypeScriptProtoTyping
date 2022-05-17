import {MouseEvent, SyntheticEvent, useEffect, useRef, RefObject} from "react";
import useCanvas, {PostDraw, PreDraw, DrawCB} from "./CanvasHook";

interface props {
  draw: DrawCB,
  onClick: (e:MouseEvent, canvas:RefObject<HTMLCanvasElement>)=>void
  preDraw? : PreDraw
  postDraw?: PostDraw
  rest? : {},
}
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// let index = 0;
const postDrawDefault = (context: CanvasRenderingContext2D, canvas:HTMLCanvasElement) => {
  // index++
  context.restore()
}



//
// export function resizeCanvas(canvas:HTMLCanvasElement) {
//   const { width, height } = canvas.getBoundingClientRect()
//
//   if (canvas.width !== width || canvas.height !== height) {
//     const { devicePixelRatio:ratio=1 } = window
//     const context = canvas.getContext('2d')
//     canvas.width = width*ratio
//     canvas.height = height*ratio
//     context?.scale(ratio, ratio)
//     return true
//   }
//
//   return false
// }

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
  //think it sizes to the size of the div
  resizeCanvasToDisplaySize(canvas)
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}

const ExperimentingView = ({draw, onClick, postDraw=postDrawDefault, preDraw=preDrawDefault,  rest = {}}:props)=>{
  const canvasRef = useCanvas(draw,{preDraw, postDraw})
  //could always pass in other things we need by having a rest props
  return <canvas onClick={(e)=>onClick(e, canvasRef)} ref={canvasRef} {...rest} style={{width:'100%', height:'100%'}}/>
}
export default ExperimentingView;
