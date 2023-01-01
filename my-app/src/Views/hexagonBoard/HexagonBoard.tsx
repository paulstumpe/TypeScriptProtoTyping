import Canvas from "../Canvas/Canvas";
import React, { useState, RefObject} from "react";
import LayoutClass, {LayoutStruct, makePoint} from "../../utilities/HexGridClasses/LayoutClass";
import Grid from "./Grid";
import {clickToCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {
    HydratedHex, moveUnit, selectAllHexesWithState,
    selectHorizontalHexes,
    selectOccupiedHexes,
    selectVerticalHexes, setUnit
} from "../../store/slices/hexSlice";
import {getMousedHex, getSelectedHex, setMousedHex, setSelectedHex, UiState} from "../../store/slices/uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectLayout} from "../../store/slices/layoutSlice";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import selectedHex from "../BelowBoard/SelectedHex";
import {addUnit, HydratedUnit} from "../../store/slices/unitsSlice";
import createHexesForRender from "./createsHexesForRender";


type props = {
}
// different styels for quick access
const oneHundredPercent = {
    width:'100%',
    height:'100%',
    border: 'solid red'
}
function HexagonBoard({}:props) {
    const verticalHexes = useAppSelector(selectVerticalHexes);
    const horizontalHexes = useAppSelector(selectHorizontalHexes);
    const layOut = useAppSelector(selectLayout)
    const hexesWithState = useAppSelector(selectAllHexesWithState);
    let selectedHex = useAppSelector(getSelectedHex);
    let mousedHex = useAppSelector(getMousedHex);
    const dispatch = useAppDispatch();

    let hexesForRender = createHexesForRender({
        verticalHexes,
        horizontalHexes,
        hexesWithState,
        selectedHex,
        mousedHex
    });

    const drawGrid = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
        Grid({
            canvas,
            canvasContext: context,
            labels:true,
            hexes:hexesForRender,
            layout: layOut,
            center: layOut.origin,
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
        let hexId = HexUtility.hexIdFromHex(hex);
        if(selectedHex && selectedHex.unit){
            const movableArr = PathFinding.getMovable(selectedHex,hexesWithState);
            let validMove = HexUtility.hexIsInArray(hex,movableArr);
            if(validMove){
                dispatch(moveUnit({
                    unit:selectedHex.unit,
                    hex
                }))
            }
        }
        dispatch(setSelectedHex({hexId}));
    }
    const onMouseMove = (
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
        let hexId = HexUtility.hexIdFromHex(hex);
        dispatch(setMousedHex({hexId}));
    }

    return (
      <div >
          <div style={oneHundredPercent}>
              <Canvas
                draw={drawGrid}
                onClick={canvasClick}
                onMouseMove={onMouseMove}
              />
          </div>
      </div>

    );
}

export default HexagonBoard;
