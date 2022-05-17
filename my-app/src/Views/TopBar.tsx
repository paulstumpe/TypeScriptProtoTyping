import ExperimentingView from "./ExperimentingView";
import {ChangeEventHandler,ReactEventHandler, SyntheticEvent, useState} from "react";
import LayoutClass, {makePoint} from "./hexagonBoard/HexGridClasses/LayoutClass";
import drawGrid, {shapeRectangleArbitrary} from "./hexagonBoard/drawHexes";
import drawCircle from "./drawAnimatedCircle";

type props = {

}
// different styels for quick access
const oneHundredPercent = {width:'100%', height:'100%'}
const fourbysix = {
  width : '600px',
  height: '400px'
}



function TopBar({}:props) {

  const [isCircle, setIsCircle] = useState(false);
  const [isPointy, setIsPointy] = useState(true);
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [verticalHexes, setVH] = useState(15);
  const [horizontalHexes, setHH] = useState(15);

  const myDraw = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
    drawGrid({
      canvas,
      context,
      hexes: shapeRectangleArbitrary(verticalHexes, horizontalHexes),
      layout: LayoutClass.newLayout(
        isPointy ? LayoutClass.pointy : LayoutClass.flat,
        makePoint(width, height),
        makePoint(0, 0))
    });
  }

  const onClick = ()=> {
    setIsCircle(prev=> {
      return !prev
    })
  }


  return (
        <div >
          <div style={{height:'20px'}} />

          <button onClick={e=>setIsCircle(pre=>!pre)}>click to switch board on and off</button>
          <button onClick={e=>setIsPointy(pre=>!pre)}>{!isPointy?"Pointy":"Flat"}</button>
          <label>height</label>
            <input type={'number'} value={height} onChange={e => setHeight(+e.target.value) } />
          <label>width</label>
            <input type={'number'} value={width} onChange={e => setWidth(+e.target.value) } />
          <label>verticalHexes</label>
            <input type={'number'} value={verticalHexes} onChange={e => setVH(+e.target.value) } />
          <label>horizontalHexes</label>
            <input type={'number'} value={horizontalHexes} onChange={e => setHH(+e.target.value) } />
          <div style={{height:'20px'}} />
          <div style={fourbysix}>
            <ExperimentingView draw={!isCircle ? drawCircle : myDraw}/>
          </div>
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
