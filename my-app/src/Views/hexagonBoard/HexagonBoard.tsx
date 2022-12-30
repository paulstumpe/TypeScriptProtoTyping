import Canvas from "../Canvas/Canvas";
import React, { useState, RefObject} from "react";
import LayoutClass, { makePoint} from "../../utilities/HexGridClasses/LayoutClass";
import Grid from "./Grid";
import {clickToCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../reduxCustomHooks";
import {selectOccupiedHexes} from "../../hexSlice";
import {setSelectedHex} from "../../uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";


type props = {
}
// different styels for quick access
const oneHundredPercent = {
    width:'100%',
    height:'100%',
    border: 'solid red'
}
function HexagonBoard({}:props) {

    const [isPointy, setIsPointy] = useState(true);
    const [width, setWidth] = useState(25);
    const [height, setHeight] = useState(25);
    const [verticalHexes, setVH] = useState(15);
    const [horizontalHexes, setHH] = useState(15);
    const hexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);;
    const dispatch = useAppDispatch();

    const hexIdsWithUnits = useAppSelector(selectOccupiedHexes)



    // let counter = useAppSelector((state) => state.counter.value);
    // // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
    // let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
    // const dispatch = useAppDispatch()


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
            hexIdsWithUnits
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
        console.log("nativecanvas click cord" + nativeCanvasClick.x + ',' + nativeCanvasClick.y)
        let hex = canvasToGrid(canvas,nativeCanvasClick,layOut);
        console.log(hex)
        let hexId = HexUtility.hexIdFromHex(hex);
        dispatch(setSelectedHex({hexId}));
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
