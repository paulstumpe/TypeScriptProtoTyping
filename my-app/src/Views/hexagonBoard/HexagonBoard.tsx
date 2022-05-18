import Canvas from "../Canvas/Canvas";
import React, { useState, RefObject} from "react";
import LayoutClass, { makePoint} from "../../utilities/HexGridClasses/LayoutClass";
import Grid from "./Grid";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import {clickToCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";

type props = {
}
// different styels for quick access
const oneHundredPercent = {
    width:'100%',
    height:'100%',
    border: 'solid red'
}
function HexagonBoard({}:props) {

    const [isCircle, setIsCircle] = useState(false);
    const [isPointy, setIsPointy] = useState(true);
    const [width, setWidth] = useState(25);
    const [height, setHeight] = useState(25);
    const [verticalHexes, setVH] = useState(15);
    const [horizontalHexes, setHH] = useState(15);
    const hexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);;
    const [selectedHex, setSelectedHex] = useState<HexStruct |undefined>();
    const center = makePoint(0,0)
    const size = makePoint(width, height)
    const layOut = LayoutClass.newLayout(
      isPointy ? LayoutClass.pointy : LayoutClass.flat,
      size,
      center
    );
    const drawGrid = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
        Grid({
            canvas,
            context,
            labels:true,
            hexes:hexes,
            layout: layOut,
            center,
            selectedHex
        });
    }
    const canvasClick  = (
      e:React.MouseEvent,
      canvasRef:RefObject<HTMLCanvasElement>
    )=>{
        let nativeEvent = e.nativeEvent;
        if(!canvasRef.current){
            throw new Error('canvasreference doesnt exist for some reason')
        }
        const canvas = canvasRef.current;
        let nativeCanvasClick = clickToCanvas(canvas,nativeEvent);
        let hex = canvasToGrid(canvas,nativeCanvasClick,layOut);
        console.log(hex)
        setSelectedHex(hex);
    }


    return (
      <div >
          <div style={oneHundredPercent}>
              <Canvas
                draw={drawGrid}
                onClick={canvasClick}
              />
          </div>
      </div>

    );
}






export default HexagonBoard;
