import Canvas from "../Canvas/Canvas";
import React, {useState, RefObject, CSSProperties} from "react";
import Grid from "./Grid";
import {clickToCanvas, getCanvas} from "../Canvas/CanvasUtilities";
import {canvasToGrid} from "./Grid";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {
    HydratedHexWithUnit,
    selectAllHexesWithState, selectHex,
    selectHorizontalHexes,
    selectVerticalHexes, setTerrain, setUnit
} from "../../store/slices/hexSlice";
import {
    getMousedHex,
    getSelectedHex,
    selectPaintSettings,
    setMousedHex,
    setSelectedHex
} from "../../store/slices/uiSlice"
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {selectLayout} from "../../store/slices/layoutSlice";
import createHexesForRender from "./createsHexesForRender";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import {
    addUnit,
    selectAllAttackableHexesWithUnits,
    selectAttackableHexes,
    selectHexesAttackableAfterMove,
    selectMovable
} from "../../store/slices/unitsSlice";
import AddUnitOrTerrain from "./AddUnitOrTerrain";
import ConfirmAttack from "./ConfirmAttack";
import ConfirmMove from "./ConfirmMove";
import StartUnitAction from "./StartUnitAction";
import {selectTurn} from "../../store/slices/gameSlice";
import {selectPrimaryPlayer} from "../../store/slices/playersSlice";
import ConfirmOrient from "./ConfirmOrient";
import {BaseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";
import AttackPrediction from "./AttackPrediction";


type TypeOfBox = 'AddUnitOrTerrain'| 'ConfirmAttack' |'ConfirmMove' |'StartMoveOrAttack' | 'ConfirmOrient' | ''
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
    const [boxClickedHexId, setBoxClickedHexId] = useState('');
    const clickedHex = useAppSelector(state=>selectHex(state,HexUtility.hexFromId(boxClickedHexId? boxClickedHexId: 'q0r0')))
    const player = useAppSelector(selectPrimaryPlayer);
    let paintSettings = useAppSelector(selectPaintSettings);
    const dispatch = useAppDispatch();

    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [showBox, setShowBox] = useState(false);
    const [typeOfBoxToShow, setTypeOfBoxToShow] = useState<TypeOfBox>('');
    const [startedMove, setStartedMove] = useState(false);
    const [startedAttack, setStartedAttack] = useState(false);
    const [startedOrient, setStartOrient] = useState(false);

    const allowedToMove = !!(selectedHex && selectedHex.unit && (selectedHex.unit.turnMoved < turn));
    const allowedToAttack = !!(selectedHex && selectedHex.unit && (selectedHex.unit.turnAttacked < turn));
    const floatyBox:CSSProperties = {
        ...floatyBoxCSS,
        left: left + 'px',
        top: top +'px',
    }

    //show attack prediction IF unit is selected and mouse is hovering over enemy Unit and diff owners
    const showAttackPrediction = selectedHex && selectedHex.unit &&
      mousedHex && mousedHex.unit && mousedHex.unit.player !==selectedHex.unit.player;
    if(selectedHex && mousedHex){

    }
    const attackPredictionCSS:CSSProperties={
        left: (left+210) + 'px',
        top: (top-50) +'px',
    }

    const clearBoxState=()=>{
        setShowBox(false);
        setTypeOfBoxToShow('');
        setStartedAttack(false);
        setStartedMove(false);
        setStartOrient(false);
    }
    const addUnitToSelected = (hex:HexStruct)=>{
        let dispatchedUnit = dispatch(addUnit(paintSettings.painterModeBrushUnit))
        dispatch(setUnit({
            unit: dispatchedUnit.payload,
            hex
        }))
    }
    const handleSetTerrain = (hex:HexStruct)=>{
        dispatch(setTerrain({
            hex,
            terrain: paintSettings.painterModeBrushTerrain
        }))
    }


    let movableToShow = allowedToMove ? movableArr : [];
    let attackableToShow = allowedToMove ? attackableAfterMove : attackRngHexes;

    //todo
    let allowedToOrient = allowedToAttack;
    //movable hexes
    //attackable hexes
    //if in move phase, movable should be shown
    //if in attack phase, movable should not be shown, and attackable should be direct range, instead of attackable plus movable range

    if(startedAttack){
        movableToShow = [];
        attackableToShow = attackRngHexes;
    }
    if(startedOrient){
        movableToShow = [];
        attackableToShow = [];
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
                movableArr:movableToShow,
                attackRngHexes: attackableToShow,
                playerId:player.id,
                turn
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

        //if clicked hex is the same as selected hex there will be no line to use to find wanted facing
        actionToTake = unitIsSelected && startedOrient && selectedHex && !HexUtility.equalTo(hex,selectedHex) ? 'makeOrientConfirm' : actionToTake;

        //should make attack confirmation
        //have clicked start attack and clicked is a valid attack target
        actionToTake = unitIsSelected && validAttackTarget && startedAttack ? 'makeAttackConfirm': actionToTake;
        //hex doesn't have unit and we're not moving or attacking
        //add terrain or unit
        // actionToTake;
        //should selectHex


        //painter mode takes priority over any of these other options
        actionToTake= paintSettings.painterMode  ? 'paintBrushModeUnit' : actionToTake;
        actionToTake= paintSettings.painterMode && paintSettings.painterModeIsTerrain ? 'paintBrushModeTerrain' : actionToTake;

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
            case 'makeOrientConfirm':
                setTypeOfBoxToShow('ConfirmOrient')
                makeFloatyBox(nativeEvent,hex)
                break;
            case 'makeAttackConfirm':
                setTypeOfBoxToShow('ConfirmAttack')
                makeFloatyBox(nativeEvent, hex);
                break;
            case 'makeTerrain':
                setTypeOfBoxToShow('AddUnitOrTerrain')
                makeFloatyBox(nativeEvent, hex);
                break;
            case 'paintBrushModeTerrain':
                handleSetTerrain(hex);
                break;
            case 'paintBrushModeUnit':
                addUnitToSelected(hex);
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

          {selectedHex && selectedHex.unit &&
            mousedHex && mousedHex.unit && mousedHex.unit.player !==selectedHex.unit.player &&
            <AttackPrediction
              selectedHex={(selectedHex as HydratedHexWithUnit)}
              mousedHex={(mousedHex as HydratedHexWithUnit)}
              style={attackPredictionCSS}
              clearBoxState={clearBoxState}/>}

          {showBox && typeOfBoxToShow==='AddUnitOrTerrain' &&
            <AddUnitOrTerrain style={floatyBox} clickedHex={boxClickedHexId} clearBoxState={clearBoxState}/>}
          {showBox && typeOfBoxToShow==='ConfirmAttack' && selectedHex?.unit &&
            <ConfirmAttack style={floatyBox} clickedHexId={boxClickedHexId} clearBoxState={clearBoxState} unit={selectedHex.unit}/>}
          {showBox && typeOfBoxToShow==='ConfirmOrient' && selectedHex?.unit &&
            <ConfirmOrient style={floatyBox} clickedHex={boxClickedHexId} clearBoxState={clearBoxState} unit={selectedHex.unit}/>}
          {showBox && typeOfBoxToShow==='ConfirmMove' && selectedHex?.unit &&
            <ConfirmMove style={floatyBox} unit={selectedHex.unit} clickedHex={boxClickedHexId} clearBoxState={clearBoxState}/>}
          {showBox && typeOfBoxToShow==='StartMoveOrAttack' &&
            <StartUnitAction
              style={floatyBox}
              clickedHex={boxClickedHexId}
              clearBoxState={clearBoxState}
              setStartMove={setStartedMove}
              setStartAttack={setStartedAttack}
              allowedToMove = {allowedToMove}
              allowedToAttack = {allowedToAttack}
              setStartOrient={setStartOrient}
              allowedToOrient={allowedToOrient}
            />}


      </div>

    );
}

export default HexagonBoard;
