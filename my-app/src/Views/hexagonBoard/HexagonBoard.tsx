import Canvas from "../Canvas/Canvas";
import React, {useState, RefObject, CSSProperties} from "react";
import Grid from "./Grid";
import {clickToCanvas, getCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {
    selectAllHexesWithState,
    selectHorizontalHexes,
    selectVerticalHexes,
} from "../../store/slices/hexSlice";
import {getMousedHex, getSelectedHex, setMousedHex, setSelectedHex, UiState} from "../../store/slices/uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectLayout} from "../../store/slices/layoutSlice";
import createHexesForRender from "./createsHexesForRender";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import {
    selectAllAttackableHexesWithUnits,
    selectAttackableHexes,
    selectHexesAttackableAfterMove,
    selectMovable
} from "../../store/slices/unitsSlice";
import AddUnitOrTerrain from "./AddUnitOrTerrain";
import ConfirmAttack from "./ConfirmAttack";
import ConfirmMove from "./ConfirmMove";
import StartMoveOrAttack from "./StartMoveOrAttack";
import {selectTurn} from "../../store/slices/gameSlice";


type TypeOfBox = 'AddUnitOrTerrain'| 'ConfirmAttack' |'ConfirmMove' |'StartMoveOrAttack' | ''
type props = {

}
const oneHundredPercent = {
    width:'100%',
    height:'100%',
    border: 'solid red'
}
const floatyBoxCSS:CSSProperties = {
    position: 'absolute',
    height: '100px',
    width: '200px',
    backgroundColor: 'lightcoral',
    border: 'black solid'
}

function HexagonBoard({}:props) {
    const verticalHexes = useAppSelector(selectVerticalHexes);
    const horizontalHexes = useAppSelector(selectHorizontalHexes);
    const layOut = useAppSelector(selectLayout)
    const hexesWithState = useAppSelector(selectAllHexesWithState);
    const turn = useAppSelector(selectTurn);
    let selectedHex = useAppSelector(getSelectedHex);
    let mousedHex = useAppSelector(getMousedHex);
    const movableArr = useAppSelector((state)=>selectMovable(state,selectedHex?.unit));
    let attackableHexesWithUnits = useAppSelector((state)=> selectAllAttackableHexesWithUnits(state,selectedHex?.unit))
    const attackRngHexes = useAppSelector((state)=>selectAttackableHexes(state,selectedHex?.unit))
    const attackableAfterMove = useAppSelector((state)=>selectHexesAttackableAfterMove(state, selectedHex?.unit))
    const dispatch = useAppDispatch();

    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [showBox, setShowBox] = useState(false);
    const [typeOfBoxToShow, setTypeOfBoxToShow] = useState<TypeOfBox>('');
    const [startedMove, setStartedMove] = useState(false);
    const [startedAttack, setStartedAttack] = useState(false);
    const [boxClickedHexId, setBoxClickedHexId] = useState('');

    const allowedToMove = !!(selectedHex && selectedHex.unit && (selectedHex.unit.turnMoved < turn));
    const allowedToAttack = !!(selectedHex && selectedHex.unit && (selectedHex.unit.turnAttacked < turn));
    const floatyBox:CSSProperties = {
        ...floatyBoxCSS,
        left: left + 'px',
        top: top +'px',
    }

    const clearBoxState=()=>{
        setShowBox(false);
        setTypeOfBoxToShow('');
        setStartedAttack(false);
        setStartedMove(false);
    }

    const drawGrid = (context:CanvasRenderingContext2D , frameCount:number, canvas:HTMLCanvasElement)=>{
        Grid({
            canvas,
            canvasContext: context,
            labels:true,
            hexes:createHexesForRender({
                verticalHexes,
                horizontalHexes,
                hexesWithState,
                selectedHex,
                mousedHex,
                movableArr,
                attackRngHexes: attackableAfterMove
            }),
            layout: layOut,
            center: layOut.origin,
        });
    }

                    /** event handlers **/
    const makeFloatyBox = (nativeEvent:React.MouseEvent['nativeEvent'], hex:HexStruct,)=>{
        const {clientX, clientY} = nativeEvent;
        setLeft(clientX)
        setTop(clientY)
        setBoxClickedHexId(HexUtility.hexIdFromHex(hex));
        setShowBox(true);
    }
    const handleCanvasClick  = (
      {nativeEvent} :React.MouseEvent,
      canvasRef:RefObject<HTMLCanvasElement>
    )=>{
        let canvas = getCanvas(canvasRef);
        let nativeCanvasClick = clickToCanvas(canvas,nativeEvent);

        //tools to determine click action
        let hex = canvasToGrid(canvas,nativeCanvasClick,layOut);
        let hexId = HexUtility.hexIdFromHex(hex);
        let validMove = HexUtility.hexIsInArray(hex,movableArr);
        let validAttackTarget = HexUtility.hexIsInArray(hex, attackableHexesWithUnits);
        let unitIsSelected = !!(selectedHex && selectedHex.unit);
        let clickedHexState = hexesWithState[HexUtility.hexIdFromHex(hex)];
        let clickedHexUnit = clickedHexState?.unit;


        //set action to take
        // probably need some long switch statement to really get the context of this click
        let actionToTake = undefined;
        //should start units turn

        //condtional should be seomthing like
        //clicked on is unit, unit you own, unit hasn't taken either attack or move yet,
        actionToTake = clickedHexUnit && !validAttackTarget ? 'startMoveOrAttack' : actionToTake;

        //should make move confirmation
        //have clicked start move, and clickedhex is in movable
        actionToTake = unitIsSelected && validMove && startedMove ? 'makeMoveConfirm': actionToTake;

        //should make attack confirmation
        //have clicked start attack and clicked is a valid attack target
        actionToTake = unitIsSelected && validAttackTarget && startedAttack ? 'makeAttackConfirm': actionToTake;
        //hex doesn't have unit and we're not moving or attacking
        //add terrain or unit
        // actionToTake;
        //should selectHex
        //last case
        actionToTake = actionToTake ? actionToTake : 'selectHex';
        console.log('action to take ' + actionToTake)
        //take action
        switch (actionToTake) {
            case 'startMoveOrAttack':
                setTypeOfBoxToShow('StartMoveOrAttack')
                makeFloatyBox(nativeEvent, hex);
                dispatch(setSelectedHex({hexId}));
                break;
            case 'makeMoveConfirm':
                setTypeOfBoxToShow('ConfirmMove')
                makeFloatyBox(nativeEvent, hex);
                break;
            case 'makeAttackConfirm':
                setTypeOfBoxToShow('ConfirmAttack')
                makeFloatyBox(nativeEvent, hex);
                break;
            case 'makeTerrain':
                setTypeOfBoxToShow('AddUnitOrTerrain')
                makeFloatyBox(nativeEvent, hex);
                break;
            case 'selectHex':
                clearBoxState();
                dispatch(setSelectedHex({hexId}));
                break;
        }
    }

    const handleOnMouseMove = (
      {nativeEvent}:React.MouseEvent,
      canvasRef:RefObject<HTMLCanvasElement>
    )=>{
        const canvas = getCanvas(canvasRef);
        let nativeCanvasClick = clickToCanvas(canvas,nativeEvent);
        let hex = canvasToGrid(canvas,nativeCanvasClick,layOut);
        let hexId = HexUtility.hexIdFromHex(hex);
        dispatch(setMousedHex({hexId}));
    }
                    /** event handlers end **/

    return (
      <div >
          <div style={oneHundredPercent}>
              <Canvas
                draw={drawGrid}
                onClick={handleCanvasClick}
                onMouseMove={handleOnMouseMove}
              />
          </div>
          {/*{showBox && <FloatyBox style={floatyBox} clickedHex={boxClickedHexId} setShowBox={setShowBox} />}*/}
          {showBox && typeOfBoxToShow==='AddUnitOrTerrain' &&
            <AddUnitOrTerrain style={floatyBox} clickedHex={boxClickedHexId} clearBoxState={clearBoxState}/>}
          {showBox && typeOfBoxToShow==='ConfirmAttack' &&
            <ConfirmAttack style={floatyBox} clickedHex={boxClickedHexId} clearBoxState={clearBoxState}/>}
          {showBox && typeOfBoxToShow==='ConfirmMove' && selectedHex?.unit &&
            <ConfirmMove style={floatyBox} unit={selectedHex.unit} clickedHex={boxClickedHexId} clearBoxState={clearBoxState}/>}
          {showBox && typeOfBoxToShow==='StartMoveOrAttack' &&
            <StartMoveOrAttack
              style={floatyBox}
              clickedHex={boxClickedHexId}
              clearBoxState={clearBoxState}
              setStartMove={setStartedMove}
              setStartAttack={setStartedAttack}
              allowedToMove = {allowedToMove}
              allowedToAttack = {allowedToAttack}
            />}
      </div>

    );
}

export default HexagonBoard;
