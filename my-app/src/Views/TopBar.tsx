import ExperimentingView from "./ExperimentingView";
import {ChangeEventHandler, ReactEventHandler, SyntheticEvent, useState, MouseEvent, RefObject} from "react";
import LayoutClass, {makePoint} from "./hexagonBoard/HexGridClasses/LayoutClass";
import drawGrid, {shapeRectangleArbitrary} from "./hexagonBoard/drawHexes";
import drawCircle from "./drawAnimatedCircle";
import HexUtility from "./hexagonBoard/HexGridClasses/HexClass";

type props = {

}
// different styels for quick access
const oneHundredPercent = {
  width:'100%',
  height:'100%',
  border: 'solid red'
}
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

  const hexes = shapeRectangleArbitrary(verticalHexes, horizontalHexes);
  const layOut = LayoutClass.newLayout(
    isPointy ? LayoutClass.pointy : LayoutClass.flat,
    makePoint(width, height),
    makePoint(0, 0)
  );
  const center = {
    x:0,
    y:0,
  }
  const myDraw = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
    drawGrid({
      canvas,
      context,
      labels:true,
      hexes:hexes,
      layout: layOut,
      center
    });
  }

  const onClick = ()=> {
    setIsCircle(prev=> {
      return !prev
    })
  }
  const canvasClick  = (
    e:MouseEvent,
    canvasRef:RefObject<HTMLCanvasElement>
  )=>{
    let nativeEvent = e.nativeEvent;
    if(!canvasRef.current){
      throw new Error('canvasreference doesnt exist for some reason')
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect()
    const x = nativeEvent.clientX - rect.left
    const y = nativeEvent.clientY - rect.top
    //x and y relative to top left corner
    //need x and y relative to center
    let xCenter = (canvas.width/2 -center.x)
    let yCenter = (canvas.height/2 -center.y)

    //need the diff between x center and x, and y center and y


    const point = {
      x:x-xCenter,
      y:y-yCenter,
    }

    // ctx.translate(canvas.width/2, canvas.height/2);
    // ctx.translate(-center.x, -center.y);
    console.log(point)
    // HexUtility.
    let hex = LayoutClass.pixelToHex(point, layOut)
    hex = HexUtility.hexRound(hex)
    console.log(hex)
  }


  return (
        <div >
          <button onClick={e=>setIsCircle(pre=>!pre)}>click to switch board on and off</button><br/>
          <button onClick={e=>setIsPointy(pre=>!pre)}>{!isPointy?"Pointy":"Flat"}</button><br/>
          <label>height:</label>
          <input type={'number'} value={height} onChange={e => setHeight(+e.target.value) } /><br/>
          <label>width:</label>
          <input type={'number'} value={width} onChange={e => setWidth(+e.target.value) } /><br/>
          <label>verticalHexes:</label>
          <input type={'number'} value={verticalHexes} onChange={e => setVH(+e.target.value) } /><br/>
          <label>horizontalHexes:</label>
          <input type={'number'} value={horizontalHexes} onChange={e => setHH(+e.target.value) } /><br/>
          <div style={{height:'20px'}} />
          <div style={{height:'20px'}} />
          <div style={oneHundredPercent}>
          {/*<div style={fourbysix}>*/}
            <ExperimentingView
              draw={!isCircle ? drawCircle : myDraw}
              onClick={canvasClick}
            />
          </div>
        </div>

    );
}






export default TopBar;
