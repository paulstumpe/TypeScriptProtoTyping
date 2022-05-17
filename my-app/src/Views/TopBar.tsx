import ExperimentingView from "./ExperimentingView";
import {useState} from "react";
import LayoutClass, {makePoint} from "./hexagonBoard/HexGridClasses/LayoutClass";
import drawGrid from "./hexagonBoard/drawHexes";

type props = {

}
function TopBar({}:props) {

  const [isCircle, setIsCircle] = useState(false);

  const drawCircle = (context:CanvasRenderingContext2D, frameCount:number) => {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#000000'
    context.beginPath()
    context.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    context.fill()
  }
  const myDraw = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
    drawGrid({
      canvas,
      context,
      layout: LayoutClass.newLayout(LayoutClass.flat, makePoint(25, 25), makePoint(0, 0))
    });

  }
  const onClick = ()=> {
    setIsCircle(prev=> {
      return !prev
    })
  }
  const oneHundredPercent = {width:'100%', height:'100%'}
  const fourbysix = {
    width : '600px',
    height: '400px'
  }

  return (
        <div style={fourbysix}>
          <button onClick={onClick}>click to switch board on and off</button>
          <ExperimentingView draw={!isCircle ? drawCircle : myDraw}/>
        </div>

    );
}






export default TopBar;
const drawBrick = (context:CanvasRenderingContext2D, frameCount:number) => {
  if (!context){
    return;
  }
  //Our first draw
  context.fillStyle = '#000000'
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}
