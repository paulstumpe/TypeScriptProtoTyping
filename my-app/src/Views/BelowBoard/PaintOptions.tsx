import {Terrains, terrains} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";
import {BaseUnits, baseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";
import React from "react";
import {selectPaintSettings, setPaintBrush} from "../../store/slices/uiSlice";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";

type props = {

}

function PaintOptions({}:props) {

  let {
    painterModeBrushTerrain,
    painterModeBrushUnit,
    painterModeIsTerrain,
  } = useAppSelector(selectPaintSettings)



  const dispatch = useAppDispatch()

  const handleSetUnitPaintBrush = (base:BaseUnits)=>{
    dispatch(setPaintBrush({unit:base, terrain:undefined}))
  }
  const handleSetTerrainPaintBrush = (terrain:Terrains)=>{
    dispatch(setPaintBrush({terrain:terrain, unit:undefined}))
  }


  return (<>
    <div>Terrains</div>
    {terrains.map(terrain=>(
      <>
        <div>
          <button
            style={{border: painterModeIsTerrain && painterModeBrushTerrain === terrain  ? 'blue solid' : ''}}
            onClick={()=>{handleSetTerrainPaintBrush(terrain)}}
        >{terrain}</button></div>
      </>))}

    <div>Units</div>
    {baseUnits.map(base=>(
      <div>
        <button
          style={{border: !painterModeIsTerrain && painterModeBrushUnit === base  ? 'blue solid' : ''}}
          onClick={e=>handleSetUnitPaintBrush(base)}
        > add {base}</button>
      </div>
    ))}
  </>);
}

export default PaintOptions
