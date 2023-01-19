import EndTurnButton from "./EndTurnButton";
import React from "react";
import {useAppSelector, useAppDispatch } from "../../store/reduxCustomHooks";
import {selectAllUnitIds} from "../../store/slices/unitsSlice";
import {shallowEqual} from "react-redux";
import UnitViewThing from "./UnitViewThing";
import SelectedHex from "./SelectedHex";
import {
  getSelectedHex, selectCreatedUnitsPlayerId,
  selectPaintSettings,
  setCreatedUnitsPlayerId,
  setPaintBrush,
  setPaintMode
} from "../../store/slices/uiSlice";
import {selectTurn} from "../../store/slices/gameSlice";
import {BaseUnits, baseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";
import ActionsList from "./ActionsList";
import {Terrains, terrains} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";
import PaintOptions from "./PaintOptions";
import {selectAllPlayers} from "../../store/slices/playersSlice";


function BottomBar() {
  let turn = useAppSelector(selectTurn);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unitIds = useAppSelector(selectAllUnitIds, shallowEqual)
  let selectedHex = useAppSelector(getSelectedHex);
  let paintSettings = useAppSelector(selectPaintSettings)
  let createdUnitsPlayerId = useAppSelector(selectCreatedUnitsPlayerId)
  let players = useAppSelector(selectAllPlayers)
  const painterMode = paintSettings.painterMode;
  const dispatch = useAppDispatch()

  const handleSetPlayer = (playerId:string)=>{
    dispatch(setCreatedUnitsPlayerId(playerId))
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
                    <div>
                      Assign created Units to : {players.map(player=>(
                        <button
                          style={{border: player.id === createdUnitsPlayerId ? 'blue solid' : ''}}
                          onClick={e=>handleSetPlayer(player.id)}
                        >
                          {player.name}
                        </button>
                    ))}
                    </div>
                    <div>
                      Painter Mode: <button onClick={handleTogglePainterMode}>{painterMode ? 'turn off' : 'turn on'}</button>
                    </div>
                  </div>

                {!painterMode && (<>
                    <div>current turn:{turn}</div>
                    <EndTurnButton />
                    {selectedHex && <SelectedHex hex={selectedHex}/>}
                </>)}

                {painterMode && <PaintOptions />}
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

