import {HexStruct} from "../utilities/HexGridClasses/Structs/Hex";
import HexUtility, {Orientation} from "../utilities/HexGridClasses/HexClass";
import React from 'react';
import {useAppSelector} from "../store/reduxCustomHooks";
import {HydratedUnit, selectUnit} from "../store/slices/unitsSlice";
import {basesDict} from "./unitClasses/soldier";
import Fe7Calculator, {FullAttackPayload, FullAttackStrikes} from "./combatSystems/fe7Calculator";
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
  fullAttackResults :FullAttackPayload
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
  let attackerWithStats = {
    ...attacker,
    hex:attackerHex,
    statsForAttack:attackerBase
  }
  let targetWithStats = {
    ...target,
    hex:targetHex,
    statsForAttack:targetBase
  }
  let fullAttackResults = Fe7Calculator.attackFull(attackerWithStats,targetWithStats,false, rngArr);
  console.log(fullAttackResults);
  // let {attackerHp,targetHp} = Fe7Calculator.analyzeFullAttackResults(attackResults,attacker,target);
  return {
    fullAttackResults,
    attackerDirection,
    turnAttacked,
    rngArr,
  };

}



export default {}
