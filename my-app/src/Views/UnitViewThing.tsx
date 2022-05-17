import {useAppDispatch, useAppSelector} from "../reduxCustomHooks";
import {nameUnit, selectAllUnitIds, selectUnit} from "./hexagonBoard/unitsSlice";
import {shallowEqual} from "react-redux";
import React from "react";

interface props {
  unitID :string;
}
function UnitViewThing({unitID}:props) {
  let dispatch = useAppDispatch();
  let counter = useAppSelector((state) => state.counter.value);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unit = useAppSelector((state)=>selectUnit(state, unitID))

  if(!unit){
    return null
  }

  let onClick = ()=>{

      dispatch(nameUnit({
        unitID,
        name : unit?.name ==='Goku'? 'Luffy':'Goku'
    }))
  }
  return <div style={{backgroundColor:'lightblue', border:'red solid', width:"fit-content"}}>
    <h3 style={{borderBottom:'solid black', textAlign:'center', marginLeft:'20px', marginRight:'20px'}}>{unit.name}</h3>
    <ul>
      <li>
        id: {unit.id}
      </li>
      <li>
        name: {unit.name}
      </li>
      <li>
        hex: {unit.hex}
      </li>
      <li>
        value: {unit.value}
      </li>
    </ul>
    <button
      onClick={onClick}
    >
      Click to rename to Luffy or Goku
    </button>
  </div>
}
export default UnitViewThing
