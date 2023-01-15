import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {nameUnit, selectUnit, setHp, setMovement, setRange, setUnitsPlayer} from "../../store/slices/unitsSlice";
import React, {ChangeEvent, useState} from "react";
import {selectHexWithUnit} from "../../store/slices/hexSlice";
import HexCordList from "./hexStructView";
import {selectTurn} from "../../store/slices/gameSlice";
import {Player, selectAllPlayers} from "../../store/slices/playersSlice";

interface props {
  unitID :string;
  highlight? : boolean;
}
export const blueBox = {
  backgroundColor:'lightblue',
  border: 'black solid',
  width:"fit-content",
  minWidth: '262px'
}
function UnitViewThing({unitID, highlight}:props) {
  const [nameInput,setNameInput] = useState('');
  const dispatch = useAppDispatch();
  const unit = useAppSelector((state)=>selectUnit(state, unitID))
  const hex = useAppSelector((state)=>selectHexWithUnit(state,unitID));
  const turn = useAppSelector(selectTurn);
  const players = useAppSelector(selectAllPlayers)
  if(!unit){
    return null
  }
  const movedThisTurn = unit.turnMoved >turn;
  const attackedThisTurn = unit.turnAttacked >turn;
  const border = highlight ? 'red solid' : 'black solid';

  const handleSubmit = (e: React.SyntheticEvent)=>{
    e.preventDefault();
    dispatch(nameUnit({unitID, name:nameInput}))
    setNameInput('');
  }
  const handleNameChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setNameInput(e.target.value);
  }
  const handleSetMovement = (e:ChangeEvent<HTMLInputElement>)=>{
    let movement =parseInt( e.target.value);
    dispatch(setMovement({unitID,movement}))
  }
  const handleSetHp = (e:ChangeEvent<HTMLInputElement>)=>{
    let hp =parseInt( e.target.value);
    dispatch(setHp({unitID,hp}))
  }
  const handleSetRange = (e:ChangeEvent<HTMLInputElement>)=>{
    let range =parseInt( e.target.value);
    dispatch(setRange({unitID,range}))
  }
  const handleSetPlayer = (player:Player)=>{
    dispatch(setUnitsPlayer({
      unitId: unit.id,
      playerId: player.id
    }))
  }

  return (
    <div style={{
      ...blueBox,
      border
    }}>
    <h3 style={{borderBottom:'solid black', color:'red', textAlign:'center', marginLeft:'20px', marginRight:'20px'}}>{unit.name}</h3>
    <ul>
      <li>
        <form onSubmit={handleSubmit}>
          name: <input placeholder={unit.name} value={nameInput} onChange={handleNameChange}/>
        </form>
      </li>
      <li>
        hex: {hex ? <HexCordList hex={hex}/> : 'no hex'}
      </li>
      <li>
        <label>HP:</label>
        <input type={'number'} value={unit.hp} onChange={handleSetHp} /><br/>
      </li>
      <li>
        <label>Movement:</label>
        <input type={'number'} value={unit.movement} onChange={handleSetMovement} /><br/>
      </li>
      <li>
        <label>Range:</label>
        <input type={'number'} value={unit.range} onChange={handleSetRange} /><br/>
      </li>
      <li>
        <div>moved this turn: {movedThisTurn ? 'yes' : 'no'}</div>
        <div>last turn moved: {unit.turnMoved}</div>
      </li>
      <li>
        <div>attacked this turn: {attackedThisTurn ? 'yes' : 'no'}</div>
        <div>last turn attacked: {unit.turnAttacked}</div>
      </li>
      <li>
        <label>Player:</label>
        <ul>
          {players.map(player=>(<li>
            <button style={{border: unit?.player===player.id ? 'blue solid' : ''}} onClick={()=>handleSetPlayer(player)}>{player.name}</button>
          </li>))}
        </ul>
      </li>

    </ul>
    </div>
  )
}
export default UnitViewThing
