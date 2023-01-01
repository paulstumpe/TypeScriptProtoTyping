import Canvas from "../Canvas/Canvas";
import React, { useState, RefObject} from "react";
import LayoutClass, {LayoutStruct, makePoint} from "../../utilities/HexGridClasses/LayoutClass";
import Grid from "./Grid";
import {clickToCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {
    HydratedHex, selectAllHexesWithState,
    selectHorizontalHexes,
    selectOccupiedHexes,
    selectVerticalHexes
} from "../../store/slices/hexSlice";
import {getSelectedHex, setSelectedHex, UiState} from "../../store/slices/uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectLayout} from "../../store/slices/layoutSlice";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import selectedHex from "../BelowBoard/SelectedHex";
import {HydratedUnit} from "../../store/slices/unitsSlice";
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
    //get layout useAppSelector();
    const verticalHexes = useAppSelector(selectVerticalHexes);
    const horizontalHexes = useAppSelector(selectHorizontalHexes);
    const layOut = useAppSelector(selectLayout)
    const hexIdsWithUnits = useAppSelector(selectOccupiedHexes)
    const hexesWithState = useAppSelector(selectAllHexesWithState);
    let selectedHex = useAppSelector(getSelectedHex);
    const dispatch = useAppDispatch();

    let hexesForRender = createHexesForRender({
        verticalHexes,
        horizontalHexes,
        hexesWithState,
        selectedHex,
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
