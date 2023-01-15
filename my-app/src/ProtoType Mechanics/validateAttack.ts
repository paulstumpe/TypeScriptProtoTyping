import {HexStruct} from "../utilities/HexGridClasses/Structs/Hex";
import HexUtility, {Orientation} from "../utilities/HexGridClasses/HexClass";
import React from 'react';
import {useAppSelector} from "../store/reduxCustomHooks";
import {HydratedUnit, selectUnit} from "../store/slices/unitsSlice";
import {basesDict} from "./unitClasses/soldier";
import Fe7Calculator from "./combatSystems/fe7Calculator";
import {HydratedHex} from "../store/slices/hexSlice";


interface Props {
  attacker:HydratedUnit,
  target:HydratedUnit,
  currentTurn:number,
  attackerHex:HydratedHex,
  targetHex:HydratedHex
}

interface Payload {
  attackerDirection: Orientation
  turnAttacked: number
  attackerHp: number,
  targetHp: number,
  rngArr:number[],
}

export const generateAttackResults = (props:Props):Payload=>{
  const {attacker, target, currentTurn, targetHex, attackerHex} = props;
  const rngArr:number[] = [];
  for(let i=0; i<10; i++){
    rngArr.push(Math.random()*100);
  }

  //calculated new orientation
  let attackerDirection = attacker?.orientation;
  if(!HexUtility.equalTo(targetHex,attackerHex)){
    attackerDirection = HexUtility.getOrientationFacingTargetHex(attackerHex,targetHex);
  }

  //todo figure out how not to repeat this code
  let turnAttacked = currentTurn;


  let attackerBase = basesDict[attacker.unitToInherit];
  let targetBase = basesDict[target.unitToInherit];
  let attackResults = Fe7Calculator.attackFull(attackerBase,targetBase,false, rngArr);
  console.log(attackResults);
  let {attackerHp,targetHp} = Fe7Calculator.analyzeFullAttackResults(attackResults,attacker,target);
  return {
    attackerHp,
    targetHp,
    attackerDirection,
    turnAttacked,
    rngArr
  };

}



export default {}
