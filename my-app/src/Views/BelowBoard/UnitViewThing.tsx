import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {nameUnit, selectAllUnitIds, selectUnit} from "../../store/slices/unitsSlice";
import React from "react";

interface props {
  unitID :string;
  highlight? : boolean;
}
function UnitViewThing({unitID, highlight}:props) {
  let dispatch = useAppDispatch();
  let counter = useAppSelector((state) => state.counter.value);
  // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
  let unit = useAppSelector((state)=>selectUnit(state, unitID))

  if(!unit){
    return null
  }
  let border = highlight ? 'red solid' : 'black solid';

  let onClick = ()=>{

      dispatch(nameUnit({
        unitID,
        name : unit?.name ==='Goku'? 'Luffy':'Goku'
    }))
  }
  return <div style={{backgroundColor:'lightblue', border, width:"fit-content"}}>
    <h3 style={{borderBottom:'solid black', textAlign:'center', marginLeft:'20px', marginRight:'20px'}}>{unit.name}</h3>
    <ul>
      <li>
        id: {unit.id}
      </li>
      <li>
        name: {unit.name}
      </li>
      <li>
        hex: todo
      </li>
      <li>
        value: {unit.value}
      </li>
      <li>
        value: {unit.movement}
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
