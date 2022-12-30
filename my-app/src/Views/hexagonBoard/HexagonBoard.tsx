import Canvas from "../Canvas/Canvas";
import React, { useState, RefObject} from "react";
import LayoutClass, { makePoint} from "../../utilities/HexGridClasses/LayoutClass";
import Grid from "./Grid";
import {clickToCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {selectHorizontalHexes, selectOccupiedHexes, selectVerticalHexes} from "../../store/slices/hexSlice";
import {setSelectedHex} from "../../store/slices/uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectLayout} from "../../store/slices/layoutSlice";


type props = {
}
// different styels for quick access
const oneHundredPercent = {
    width:'100%',
    height:'100%',
    border: 'solid red'
}
function HexagonBoard({}:props) {
    //get layout useAppSelector();
    const verticalHexes = useAppSelector(selectVerticalHexes);
    const horizontalHexes = useAppSelector(selectHorizontalHexes);
    const layOut = useAppSelector(selectLayout)
    const hexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);
    const hexIdsWithUnits = useAppSelector(selectOccupiedHexes)
    const dispatch = useAppDispatch();

    const drawGrid = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
        Grid({
            canvas,
            context,
            labels:true,
            hexes:hexes,
            layout: layOut,
            center: layOut.origin,
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
