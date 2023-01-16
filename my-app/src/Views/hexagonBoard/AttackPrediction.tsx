import React, {CSSProperties} from "react";
import {setSelectedHex} from "../../store/slices/uiSlice";
import {useAppDispatch} from "../../store/reduxCustomHooks";
import {HydratedHex, HydratedHexWithUnit} from "../../store/slices/hexSlice";
import {basesDict, BaseUnits, StatsForAttack} from "../../ProtoType Mechanics/unitClasses/soldier";
import {nanoid} from "@reduxjs/toolkit";
import Fe7Calculator from "../../ProtoType Mechanics/combatSystems/fe7Calculator";
import useMousePosition from "../UseMousePosition";
import {terrainsDict} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";

export interface props {
  style : CSSProperties
  clearBoxState:  React.Dispatch<React.SetStateAction<boolean>>
  selectedHex: HydratedHexWithUnit
  mousedHex: HydratedHexWithUnit
}



function AttackPrediction({style, selectedHex, mousedHex, clearBoxState}:props) {
  const dispatch = useAppDispatch();
  // let attacker = {
  //   ...basesDict[selectedHex.unit.unitToInherit],
  //   ...selectedHex.unit
  // };
  // let target = {
  //   ...basesDict[mousedHex.unit.unitToInherit],
  //   ...mousedHex.unit
  // };
  const mousePosition = useMousePosition();
  if(mousePosition.x===null || mousePosition.y===null){
    return null;
  }
  let width= 400;
  let left = mousePosition.x - (width/2);
  let top = mousePosition.y-200;

  const attackPredictionCSS:CSSProperties ={
    position: 'absolute',
    width: '400px',
    backgroundColor: 'white',
    border: 'black solid',
    left: (left>0 ? left : 0) + 'px',
    top: (top>0 ? top: 0) +'px',
    zIndex:10,
  }

  let attackerBase = {
    ...basesDict[selectedHex.unit.unitToInherit],
    terrainBonusDefense: selectedHex.terrain ? terrainsDict[selectedHex.terrain].defense : 0,
    terrainBonusEvade : selectedHex.terrain ? terrainsDict[selectedHex.terrain].evasion : 0
  }


  let targetBase = {
    ...basesDict[mousedHex.unit.unitToInherit],
    terrainBonusDefense: mousedHex.terrain ? terrainsDict[mousedHex.terrain].defense : 0,
    terrainBonusEvade : mousedHex.terrain ? terrainsDict[mousedHex.terrain].evasion : 0
  }
  let attackerPreview = FE7StatsPreviewOneSide(attackerBase, targetBase);
  let targetPreview = FE7StatsPreviewOneSide(targetBase, attackerBase);

  return (
    <div style={{
      ...style,
      ...attackPredictionCSS
    }}>
      <div style={{display:"flex"}}>

        <div title={'left column'}>
          <h2 style={{textAlign:'center'}}>attacker</h2>
          <div style={{padding:'10px'}}>
            <h3>{attackerPreview.double ? '2x!' :''}</h3>
            <div>hit chance :         {attackerPreview.acc}%</div>
            <div>crit chance :      {attackerPreview.critchance}%</div>
            <div>damage :        {attackerPreview.damagePerHit}</div>
          </div>
        </div>
        <div title={'right column'} style={{  marginLeft: 'auto'}}>
          <h2 style={{textAlign:'center'}}>enemy/defender</h2>
          <div style={{padding:'10px'}}>
            <h3>{targetPreview.double ? '2x!' :''}</h3>
            <div>hit chance :         {targetPreview.acc}%</div>
            <div>crit chance :      {targetPreview.critchance}%</div>
            <div>damage :        {targetPreview.damagePerHit}</div>
          </div>
        </div>
      </div>

      {/*<div>attacker acc :{attackerPreview.acc}</div>*/}
      {/*<div>attacker double :{attackerPreview.double}</div>*/}
      {/*<div>attacker critchance :{attackerPreview.critchance}</div>*/}
      {/*<div>attacker damage :{attackerPreview.damagePerHit}</div>*/}

      {/*<div>target acc :{targetPreview.acc}</div>*/}
      {/*<div>target double :{targetPreview.double}</div>*/}
      {/*<div>target critchance :{targetPreview.critchance}</div>*/}
      {/*<div>target damage :{targetPreview.damagePerHit}</div>*/}
      {/*<div>{selectedHex.unit.hp}</div>*/}
      {/*<div>{selectedHex.unit.id}</div>*/}
      {/*<div>{selectedHex.unit.name }</div>*/}
      {/*<div>{selectedHex.unit.movement}</div>*/}
      {/*<div>{selectedHex.unit.range}</div>*/}
      {/*<div>{selectedHex.unit.turnAttacked}</div>*/}
      {/*<div>{selectedHex.unit.turnMoved}</div>*/}
      {/*<div>{selectedHex.unit.orientation}</div>*/}
      {/*<div>{selectedHex.unit.unitToInherit}</div>*/}


    </div>
  );
}
const FE7StatsPreviewOneSide = (attackerBase:StatsForAttack, targetBase:StatsForAttack,)=>{
  let double = Fe7Calculator.doubleAttackIf(
    Fe7Calculator.getAttackSpeed(attackerBase),
    Fe7Calculator.getAttackSpeed(targetBase)
  );
  let acc = Fe7Calculator.getBattleAcc(attackerBase,targetBase);
  let critchance = Fe7Calculator.getBattleCritRate(attackerBase,targetBase);
  let damagePerHit = Fe7Calculator.getDamage(attackerBase,targetBase, false);
  return {
    double,
    acc,
    critchance,
    damagePerHit
  }
}
export default AttackPrediction;
