import EndTurnButton from "./EndTurnButton";
import React from "react";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {selectAllUnitIds} from "../../store/slices/unitsSlice";
import {shallowEqual} from "react-redux";
import UnitViewThing from "./UnitViewThing";
import SelectedHex from "./SelectedHex";
import {getSelectedHex, selectPaintSettings, setPaintBrush, setPaintMode} from "../../store/slices/uiSlice";
import {selectTurn} from "../../store/slices/gameSlice";
import {BaseUnits, baseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";
import ActionsList from "./ActionsList";
import {Terrains, terrains} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";


function BottomBar() {
  let turn = useAppSelector(selectTurn);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
  let selectedHex = useAppSelector(getSelectedHex);
  let paintSettings = useAppSelector(selectPaintSettings)
  const painterMode = paintSettings.painterMode;
  const dispatch = useAppDispatch()

  const handleSetUnitPaintBrush = (base:BaseUnits)=>{
    dispatch(setPaintBrush({unit:base, terrain:undefined}))
  }
  const handleSetTerrainPaintBrush = (terrain:Terrains)=>{
    dispatch(setPaintBrush({terrain:terrain, unit:undefined}))
  }

  const handleTogglePainterMode = ()=>{
    dispatch(setPaintMode(!painterMode));
  }


  return (
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          columnGap:"30px"
        }}>

            <div title={'left column'} style={{
              flex:'auto'
            }}>
              <h2>Command Menu</h2>
                  <div>
                      PainterMode: <button onClick={handleTogglePainterMode}>{painterMode ? 'turn off' : 'turn on'}</button>
                  </div>

                {!painterMode && (<>
                    <div>current turn:{turn}</div>
                    <EndTurnButton />
                    {selectedHex && <SelectedHex hex={selectedHex}/>}
                </>)}

                {painterMode && (<>
                    <div>Terrains</div>
                    {terrains.map(terrain=>(
                        <>
                            <div><button onClick={()=>{handleSetTerrainPaintBrush(terrain)}}>{terrain}</button></div>
                        </>))}

                    <div>Units</div>
                    {baseUnits.map(base=>(
                        <div>
                            <button onClick={e=>handleSetUnitPaintBrush(base)} > add {base}</button>
                        </div>
                    ))}
                </>)}
            </div>

          <div title={'center column'} style={{
            flex:"auto",
            minWidth:'500px'
          }}>
            <div>
              <ActionsList />
            </div>
          </div>

          <div title={'right column'} style={{
            marginLeft: 'auto',
            flex:'auto'
          }}>
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

let neighbors=[
  {
    "q": -3,
    "r": 0,
    "s": 3
  },
  {
    "q": -3,
    "r": -1,
    "s": 4
  },
  {
    "q": -4,
    "r": -1,
    "s": 5
  },
  {
    "q": -5,
    "r": 0,
    "s": 5
  },
  {
    "q": -5,
    "r": 1,
    "s": 4
  },
  {
    "q": -4,
    "r": 1,
    "s": 3
  }
];
let arr = [
  {
    "q": -4,
    "r": 0,
    "s": 4
  },
  {
    "q": -4,
    "r": 1,
    "s": 3
  }
]
let direction;

