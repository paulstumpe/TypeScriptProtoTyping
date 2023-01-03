import { useRef, useEffect } from 'react'

export type DrawCB = (context: CanvasRenderingContext2D, frameCount: number, canvas: HTMLCanvasElement) => void


export type PreDraw = (context: CanvasRenderingContext2D, canvas:  HTMLCanvasElement)=>void
export type PostDraw = (context: CanvasRenderingContext2D, canvas:  HTMLCanvasElement)=>void;
interface DrawCBS {
  preDraw : PreDraw
  postDraw: PostDraw
}

const useCanvas = (draw:DrawCB, {postDraw, preDraw}:DrawCBS) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current ;
    const context = canvas?.getContext('2d');
    if (!canvas || !context){
      return
    }

    // draw(context);
    let frameCount = 0
    //the number for animationframe will be overwritten, this is placeholder needed to keep
    //animationframeid in correctscope
    let animationFrameId = 0
    //Our draw came here


    const render = () => {
      preDraw(context, canvas);
      frameCount++
      draw(context, frameCount, canvas)
      animationFrameId = window.requestAnimationFrame(render)
      postDraw(context, canvas);
    }
    render()


    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return canvasRef
}

export default useCanvas;
