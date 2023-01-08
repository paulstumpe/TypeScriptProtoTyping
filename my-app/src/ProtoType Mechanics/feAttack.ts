import {Weapon, WeaponType} from "./weapons";
import {addOnMissing, oswin, StatsForAttack} from "./unitClasses/soldier";
import {HydratedUnit} from "../store/slices/unitsSlice";

let physical = ['sword', 'lance', 'axe', 'bow'];
let magic = ['stave', 'animaTome', 'darkTome', 'lightTome'];
export type AttackType = 'physical' | 'magic'

// export interface UnitForAttack {
//   con:number,
//   speed:number,
//   skill:number,
//   luck:number,
//   supBonus:number,
//   SRankBonus:number,
//   tacticianBonus:number,
//   terrainBonus:number,
//   strength:number,
//   effectiveCoefficient:number,
//   magic:number,
//   defence:number,
//   resistance:number,
//   criticalBonus:number,
//   weapon:Weapon,
// }

interface AttackResults {
  isCritical:boolean,
  hit:boolean,
  damage:number,
}

interface FullAttackResults {
  firstAttack:AttackResults,
  secondAttack?:AttackResults,
  counterAttack?:AttackResults,
  secondCounterAttack?:AttackResults,
}

export const feAttackFull=(attacker:StatsForAttack, target:StatsForAttack, counterStrikeInRange:boolean, rngArr:number[]):FullAttackResults=>{
  let attackSpeedAttacker = getAttackSpeed(attacker);
  let attackSpeedTarget = getAttackSpeed(target);
  let attackerIsDoubleAttack = doubleAttackIf(attackSpeedAttacker,attackSpeedTarget);
  let targetIsDoubleAttack = doubleAttackIf(attackSpeedTarget, attackSpeedAttacker);
  //first attack
  let firstAttack = feAttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
  let fullAttackResults:FullAttackResults = {
    firstAttack
  }
  //counterStrike
  if(counterStrikeInRange){
    let counterAttack = feAttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
    fullAttackResults.counterAttack = counterAttack;
    //second attack
    if(targetIsDoubleAttack){
      fullAttackResults.secondCounterAttack = feAttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
    }
  }

  //second attack
  if(attackerIsDoubleAttack){
    fullAttackResults.secondAttack = feAttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
  }

 return fullAttackResults
}
export const feAttackStrike = (attacker:StatsForAttack, target:StatsForAttack, hitRng:number|undefined, critRng:number|undefined):AttackResults=>{
  if(hitRng===undefined || critRng===undefined){
    throw Error('rng was not a number somehow')
  }

  let attackerBattleCritRate = getBattleCritRate(attacker,target);
  let isCritical = attackerBattleCritRate > critRng;
  let attackerBattleAcc = getBattleAcc(attacker,target);
  let hit = attackerBattleAcc > hitRng;
  let damage = 0;
  if(hit){
    damage = getDamage(attacker,target, isCritical);
  }
  return {
    hit,
    isCritical,
    damage,
  }
}

export const doubleAttackIf = (attackerAtkSpeed:number, targetAtkSpeed:number):boolean=>{
  let spdDif = attackerAtkSpeed-targetAtkSpeed;
  return spdDif >= 4;
}

export const getAttackSpeed = (attacker:StatsForAttack)=>{
  let {weapon, con, speed} = attacker;
  let {weight} = weapon;
  let weaponCont = weight-con;
  if (weaponCont<0){
    weaponCont=0;
  }
  let atkspeed = speed-(weaponCont);
  return atkspeed;
}

export const getDamage = (attacker:StatsForAttack, target:StatsForAttack, critical:boolean)=>{
  let attackerAtk = getAtk(attacker, target);
  let targetDef = getDef(attacker, target);
  let criticalCooeficient = critical ? 3 : 1;
  return (attackerAtk - targetDef) * criticalCooeficient
}
export const getAttackType = (attacker:StatsForAttack):AttackType=>{
  if(physical.includes(attacker.weapon.type)){
    return 'physical'
  }
  if(magic.includes(attacker.weapon.type)){
    return 'magic'
  }
  throw new Error('weapon type wasnt physical or magic')
}
export const getAtk = (attacker:StatsForAttack, target:StatsForAttack)=>{
  const attackType = getAttackType(attacker);
  switch (attackType){
    case "physical":
      return getAtkPhys(attacker,target)
      break;
    case "magic":
      return getAtkMagic(attacker,target)
      break;
  }
  throw new Error('weapon type wasnt physical or magic')
}

export const getAtkPhys = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let weaponAdvantage = weaponTriangle(attacker.weapon.type, target.weapon.type);
  let triMod = getTriangleModAtk(weaponAdvantage);
  let effectiveCoefficient = getEffectiveCoefficient(weaponAdvantage);
  return attacker.strength +((attacker.weapon.might + triMod) * effectiveCoefficient) + attacker.supBonus;
}

export const getAtkMagic = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let weaponAdvantage = weaponTriangle(attacker.weapon.type, target.weapon.type);
  let triMod = getTriangleModAtk(weaponAdvantage);
  let effectiveCoefficient = getEffectiveCoefficient(weaponAdvantage);
  return attacker.magic + ((attacker.weapon.might + triMod) * effectiveCoefficient) +attacker.supBonus
}

export const getDef = (attacker:StatsForAttack, target:StatsForAttack)=>{
  const attackType = getAttackType(attacker);
  switch (attackType){
    case "physical":
      return getDefPhysical(target);
      break;
    case "magic":
      return getDefMagical(target);
      break;
  }
  throw new Error('weapon type wasnt physical or magic')
}

export const getDefPhysical = (target:StatsForAttack)=>{
  return target.defense + target.supBonus + target.terrainBonus
}

export const getDefMagical = (target:StatsForAttack)=>{
  return target.resistance + target.supBonus +target.terrainBonus
}

export const getBattleAcc = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let unitAcc = getUnitAcc(attacker,target);
  let targetAvoid = getAvoid(attacker, target);
  return unitAcc-targetAvoid;

}
export const getUnitAcc = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let weaponTri = weaponTriangle(attacker.weapon.type, target.weapon.type)
  let sRankBonus = 0; //todo
  let weaponTriBonus = getTriangleModAcc(weaponTri)
  let accuracy = attacker.weapon.hit + (attacker.skill*2) + (attacker.luck/2) +attacker.supBonus +weaponTriBonus + sRankBonus +attacker.tacticianBonus;
  return accuracy;
}
export const getAvoid = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let targetAttackSpeed = getAttackSpeed(target)
  return (targetAttackSpeed * 2) + target.luck + target.supBonus + target.tacticianBonus;
}

export const getBattleCritRate = (attacker:StatsForAttack, target:StatsForAttack)=>{
  let critRate = getCritRate(attacker);
  let critEvade = getCritEvade(target);
  return critRate-critEvade
}
export const getCritRate = (attacker:StatsForAttack)=>{
  let sRankBonus = 0; //todo
  return attacker.weapon.critical + (attacker.skill * 2) + attacker.supBonus + attacker.criticalBonus + sRankBonus;
}
export const getCritEvade = (target:StatsForAttack)=>{
  return target.luck+target.supBonus + target.tacticianBonus;
}



export type WeaponAdvantage =   'goodAgainst' | 'weakAgainst' | 'neutral'
export const weaponTriangle = (attackerWeaponType:WeaponType, targetWeaponType:WeaponType):WeaponAdvantage=>{
  let result:WeaponAdvantage = 'neutral'
  switch (attackerWeaponType){
    case 'sword':
      if (targetWeaponType === 'axe'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'lance'){
        result = 'weakAgainst'
      }
      break;
    case 'lance':
      if (targetWeaponType === 'sword'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'axe'){
        result = 'weakAgainst'
      }
      break;
    case 'axe':
      if (targetWeaponType === 'lance'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'sword'){
        result = 'weakAgainst'
      }
      break;
    case 'bow':
      break;
    case 'stave':
      break;
    case 'animaTome':
      if (targetWeaponType === 'lightTome'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'darkTome'){
        result = 'weakAgainst'
      }
      break;
    case 'darkTome':
      if (targetWeaponType === 'animaTome'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'lightTome'){
        result = 'weakAgainst'
      }
      break;
    case 'lightTome' :
      if (targetWeaponType === 'darkTome'){
        result = 'goodAgainst'
      }
      if(targetWeaponType === 'animaTome'){
        result = 'weakAgainst'
      }
      break;
  }
  return result;
}

export const getTriangleModAtk =  (weaponAdvantage:WeaponAdvantage)=>{
  let triangleMod = 0;
  switch (weaponAdvantage){
    case 'goodAgainst':
      triangleMod = 1;
      break;
    case 'weakAgainst':
      triangleMod = -1;
      break;
    case 'neutral':
      triangleMod = 0;
      break;
  }
  return triangleMod;
}
export const getTriangleModAcc = (weaponAdvantage:WeaponAdvantage)=>{
  let triangleMod = 0;
  switch (weaponAdvantage){
    case 'goodAgainst':
      triangleMod = 15;
      break;
    case 'weakAgainst':
      triangleMod = -15;
      break;
    case 'neutral':
      triangleMod = 0;
      break;
  }
  return triangleMod;
}

export type Region = 'english' | 'japan'
export const getEffectiveCoefficient = (weaponAdvantage:WeaponAdvantage, region:Region ='english')=>{
  let effectiveCoefficient = 0;
  let coEfficientIfEffective = 2;
  switch (region){
    case 'japan':
      coEfficientIfEffective =3
      break;
    case 'english':
      coEfficientIfEffective =2
      break;
  }
  switch (weaponAdvantage){
    case 'goodAgainst':
      effectiveCoefficient = coEfficientIfEffective;
      break;
    case 'weakAgainst':
      effectiveCoefficient = 1;
      break;
    case 'neutral':
      effectiveCoefficient = 1;
      break;
  }
  return effectiveCoefficient;
}
export const knightPlusMissing = {
  ...oswin,
  ...addOnMissing
}

export const analyzeFullAttackResults = (attackResults:FullAttackResults, attacker:HydratedUnit, target:HydratedUnit)=>{
  const {firstAttack,secondAttack,counterAttack,secondCounterAttack} = attackResults
  let attackerHp =attacker.hp;
  let targetHp = target.hp;

  targetHp = analyzeAttackResult(targetHp,firstAttack)
  if(targetHp <=0){
    return {
      attackerHp,
      targetHp
    }
  }

  if(counterAttack){
    attackerHp = analyzeAttackResult(attackerHp,counterAttack)
    if(attackerHp <=0){
      return {
        attackerHp,
        targetHp
      }
    }
  }

  if(secondCounterAttack){
    attackerHp = analyzeAttackResult(attackerHp,secondCounterAttack)
    if(attackerHp <=0){
      return {
        attackerHp,
        targetHp
      }
    }
  }

  if(secondAttack){
    targetHp = analyzeAttackResult(targetHp,secondAttack)
    if(targetHp <=0){
      return {
        attackerHp,
        targetHp
      }
    }
  }
  return {
    attackerHp,
    targetHp
  }


}

const analyzeAttackResult = (targetHP:number, attackResults:AttackResults)=>{
   return targetHP-attackResults.damage;
}
export default {}
