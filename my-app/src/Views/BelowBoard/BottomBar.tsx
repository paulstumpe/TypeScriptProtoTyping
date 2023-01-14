import EndTurnButton from "./EndTurnButton";
import React from "react";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {addUnit, selectAllUnitIds} from "../../store/slices/unitsSlice";
import {increment} from "../../store/slices/counterSlice";
import {shallowEqual, useDispatch} from "react-redux";
import UnitViewThing from "./UnitViewThing";
import SelectedHex from "./SelectedHex";
import {getSelectedHex, selectPaintSettings, setPaintBrush, setPaintMode} from "../../store/slices/uiSlice";
import {endTurn, selectTurn} from "../../store/slices/gameSlice";
import {setTerrain, setUnit, Terrains, terrainsArr} from "../../store/slices/hexSlice";
import {basesDict, BaseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";

function BottomBar() {
  let turn = useAppSelector(selectTurn);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
  let selectedHex = useAppSelector(getSelectedHex);
  let paintSettings = useAppSelector(selectPaintSettings)
  const painterMode = paintSettings.painterMode;
  const basesArr:BaseUnits[] = [];
  let obj = basesDict;
  for (const basesArrKey in basesDict) {
    // @ts-ignore
    basesArr.push(basesDict[basesArrKey].name);
  }
  const dispatch = useDispatch()
  const handleEndTurn = ()=>{
    dispatch(endTurn());
  }

  const handleSetUnitPaintBrush = (base:BaseUnits)=>{
    dispatch(setPaintBrush({unit:base, terrain:undefined}))
  }
  const handleSetTerrainPaintBrush = (terrain:Terrains)=>{
    dispatch(setPaintBrush({terrain:terrain, unit:undefined}))
  }

  const handleTogglePainterMode = ()=>{
    setPaintMode(!paintSettings.painterMode)
  }


  return (
        <div style={{display:"flex"}}>

            <div title={'left column'}>
                  <div>
                      PainterMode: <button onClick={handleTogglePainterMode}>{painterMode ? 'turn off' : 'turn on'}</button>
                  </div>

                {!painterMode && (<>
                    <div>current turn:{turn}</div>
                    <EndTurnButton  endTurn={handleEndTurn}/>
                    {selectedHex && <SelectedHex hex={selectedHex}/>}
                </>)}

                {painterMode && (<>
                    <div>Terrains</div>
                    {terrainsArr.map(terrain=>(
                        <>
                            <div><button onClick={()=>{handleSetTerrainPaintBrush(terrain)}}>{terrain}</button></div>
                        </>))}

                    <div>Units</div>
                    {basesArr.map(base=>(
                        <div>
                            <button onClick={e=>handleSetUnitPaintBrush(base)} > add {base}</button>
                        </div>
                    ))}
                </>)}
            </div>

            <div title={'right column'} style={{  marginLeft: 'auto'}}>
            <h2 style={{textAlign:'center'}}>unit list</h2>
            <div>
              {unitIds.map(unitID=>
                <UnitViewThing unitID={unitID}></UnitViewThing>
              )}
            </div>
          </div>
        </div>

    );
}

export default BottomBar;
