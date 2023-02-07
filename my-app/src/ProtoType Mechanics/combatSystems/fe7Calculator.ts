import {basesDict, StatsForAttack} from "../unitClasses/soldier";
import {WeaponType} from "../weapons";
import {HydratedUnit} from "../../store/slices/unitsSlice";
import {HydratedHex} from "../../store/slices/hexSlice";
import {terrainsDict} from "../fe7 stats/terrain and movement";
import {isArray} from "util";
import {RangeCalculator} from "../attackRanges";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";


let physical = ['sword', 'lance', 'axe', 'bow'];
let magic = ['stave', 'animaTome', 'darkTome', 'lightTome'];
export type AttackType = 'physical' | 'magic'
export type Region = 'english' | 'japan'


interface AttackResults {
  attacker:UnitPlusStatsForAttack
  target:UnitPlusStatsForAttack
  isCritical:boolean,
  hit:boolean,
  damage:number,
}

export type FullAttackStrikes = AttackResults[];
export type FullAttackPayload = {
  fullAttackStrikes:FullAttackStrikes,
  effects:{
    unitIdsRemovedFromMap:string[]
  }
}

export type WeaponAdvantage =   'goodAgainst' | 'weakAgainst' | 'neutral'
export interface UnitPlusStatsForAttack extends HydratedUnit{
  statsForAttack:StatsForAttack
  hex:HydratedHex,
}

//https://github.com/microsoft/TypeScript/issues/14600#issuecomment-333416173
//https://github.com/microsoft/TypeScript/issues/14600#issuecomment-484476715
//https://github.com/microsoft/TypeScript/issues/14600#issuecomment-488817980
// https://github.com/microsoft/TypeScript/issues/14600#issuecomment-504624101
// https://github.com/microsoft/TypeScript/issues/33892#issuecomment-578401696
abstract class CombatCalculator {
  // abstract static attackFull(attacker:StatsForAttack, target:StatsForAttack, counterStrikeInRange:boolean, rngArr:number[]):FullAttackResults
}

export default class Fe7Calculator extends CombatCalculator{
  // attackFull(attacker: StatsForAttack, target: StatsForAttack, counterStrikeInRange: boolean, rngArr: number[]): FullAttackResults {
  //     throw new Error("Method not implemented.");
  // }
  /**
   * a pretty sussy function. the way it goes about ordering stuff and triggering stuff obviously is specific to fe combat,
   * so it needs to live within an fe calculator. yet, theres a lot of breaking points through this where I would like to be triggering stuff
   * outside of fe.
   *
   * right now its returning an object, but maybe it could return like a pipe of instructions to carry out one at a time
   * or something, so the caller could decide when to proceed with the next action.
   *
   * @param attacker
   * @param target
   * @param counterStrikeInRange
   * @param rngArr
   */
  public static attackFull (attacker:UnitPlusStatsForAttack, target:UnitPlusStatsForAttack, counterStrikeInRange:boolean, rngArr:number[]):FullAttackPayload{
    attacker.statsForAttack =
      {
       ...attacker.statsForAttack,
        terrainBonusDefense: attacker.hex.terrain ? terrainsDict[attacker.hex.terrain].defense : 0,
        terrainBonusEvade : attacker.hex.terrain ? terrainsDict[attacker.hex.terrain].evasion : 0
      }
    target.statsForAttack = {
      ...target.statsForAttack,
      terrainBonusDefense: target.hex.terrain ? terrainsDict[target.hex.terrain].defense : 0,
      terrainBonusEvade : target.hex.terrain ? terrainsDict[target.hex.terrain].evasion : 0
    }
    let attackSpeedAttacker = this.getAttackSpeed(attacker.statsForAttack);
    let attackSpeedTarget = this.getAttackSpeed(target.statsForAttack);
    let attackerIsDoubleAttack = this.doubleAttackIf(attackSpeedAttacker,attackSpeedTarget);
    let targetIsDoubleAttack = this.doubleAttackIf(attackSpeedTarget, attackSpeedAttacker);
    //should also probably include hp results after each and stopping if one hits zero
    //idk the cleanest way to do this
    //first attack
    let firstAttack = this.AttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
    let fullAttackStrikes:FullAttackStrikes = [firstAttack];
    //counterStrike
    if(counterStrikeInRange && this.unitsKilled(fullAttackStrikes,attacker,target).length !== 0){
      let counterAttack = this.AttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
      fullAttackStrikes.push(counterAttack);
      //second attack
      if(targetIsDoubleAttack && this.unitsKilled(fullAttackStrikes,attacker,target).length !== 0){
        let secondCounterAttack = this.AttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
        fullAttackStrikes.push(secondCounterAttack);
      }
    }

    //second attack
    if(attackerIsDoubleAttack && this.unitsKilled(fullAttackStrikes,attacker,target).length !== 0){
      let secondAttack = this.AttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
      fullAttackStrikes.push(secondAttack);
    }
    let unitIdsRemovedFromMap= this.unitsKilled(fullAttackStrikes,attacker,target)
    return {
      fullAttackStrikes,
      effects:{
        unitIdsRemovedFromMap
      }
    }
  }

  public static unitsKilled = (attackStrikesSoFar:AttackResults[], attacker:UnitPlusStatsForAttack,target:UnitPlusStatsForAttack):string[]=>{
    let attackerHp = attacker.hp
    let targetHp = target.hp;
    let result = [];
    attackStrikesSoFar.forEach(attackStrike=>{
      if(attackStrike.target.id === target.id) {
        targetHp = targetHp - attackStrike.damage
      } else {
        attackerHp = attackerHp - attackStrike.damage
      }
    })
    if(attackerHp<=0){
      result.push(attacker.id)
    }
    if(targetHp<=0){
      result.push(target.id)
    }
    return result;
  }

  private static AttackStrike (attacker:UnitPlusStatsForAttack, target:UnitPlusStatsForAttack, hitRng:number|undefined, critRng:number|undefined):AttackResults{
    let attackerStats = attacker.statsForAttack;
    let targetStats = target.statsForAttack;
    if(hitRng===undefined || critRng===undefined){
      throw Error('rng was not a number somehow')
    }

    let attackerBattleCritRate = this.getBattleCritRate(attackerStats,targetStats);
    let isCritical = attackerBattleCritRate > critRng;
    let attackerBattleAcc = this.getBattleAcc(attackerStats,targetStats);
    let hit = attackerBattleAcc > hitRng;
    let damage = 0;
    if(hit){
      damage = this.getDamage(attackerStats,targetStats, isCritical);
    }
    if(damage<0){
      damage=0;
    }
    return {
      hit,
      isCritical,
      damage,
      attacker,
      target,
    }
  }

  public static doubleAttackIf (attackerAtkSpeed:number, targetAtkSpeed:number):boolean{
    let spdDif = attackerAtkSpeed-targetAtkSpeed;
    return spdDif >= 4;
  }

  public static getAttackSpeed  (attacker:StatsForAttack){
    let {weapon, con, speed} = attacker;
    let {weight} = weapon;
    let weaponCont = weight-con;
    if (weaponCont<0){
      weaponCont=0;
    }
    let atkspeed = speed-(weaponCont);
    return atkspeed;
  }

  public static getDamage  (attacker:StatsForAttack, target:StatsForAttack, critical:boolean){
    let attackerAtk = this.getAtk(attacker, target);
    let targetDef = this.getDef(attacker, target);
    let criticalCooeficient = critical ? 3 : 1;
    return (attackerAtk - targetDef) * criticalCooeficient
  }
  private static getAttackType  (attacker:StatsForAttack):AttackType{
    if(physical.includes(attacker.weapon.type)){
      return 'physical'
    }
    if(magic.includes(attacker.weapon.type)){
      return 'magic'
    }
    throw new Error('weapon type wasnt physical or magic')
  }
  private static getAtk  (attacker:StatsForAttack, target:StatsForAttack){
    const attackType = this.getAttackType(attacker);
    switch (attackType){
      case "physical":
        return this.getAtkPhys(attacker,target)
        break;
      case "magic":
        return this.getAtkMagic(attacker,target)
        break;
    }
    throw new Error('weapon type wasnt physical or magic')
  }

  private static getAtkPhys  (attacker:StatsForAttack, target:StatsForAttack){
    let weaponAdvantage = this.weaponTriangle(attacker.weapon.type, target.weapon.type);
    let triMod = this.getTriangleModAtk(weaponAdvantage);
    let effectiveCoefficient = this.getEffectiveCoefficient(weaponAdvantage);
    return attacker.strength +((attacker.weapon.might + triMod) * effectiveCoefficient) + attacker.supBonus;
  }

  private static getAtkMagic  (attacker:StatsForAttack, target:StatsForAttack){
    let weaponAdvantage = this.weaponTriangle(attacker.weapon.type, target.weapon.type);
    let triMod = this.getTriangleModAtk(weaponAdvantage);
    let effectiveCoefficient = this.getEffectiveCoefficient(weaponAdvantage);
    return attacker.magic + ((attacker.weapon.might + triMod) * effectiveCoefficient) +attacker.supBonus
  }

  private static getDef  (attacker:StatsForAttack, target:StatsForAttack){
    const attackType = this.getAttackType(attacker);
    switch (attackType){
      case "physical":
        return this.getDefPhysical(target);
        break;
      case "magic":
        return this.getDefMagical(target);
        break;
    }
    throw new Error('weapon type wasnt physical or magic')
  }

  private static getDefPhysical  (target:StatsForAttack){
    return target.defense + target.supBonus + target.terrainBonusDefense
  }

  private static getDefMagical  (target:StatsForAttack){
    return target.resistance + target.supBonus +target.terrainBonusDefense
  }

  public static getBattleAcc  (attacker:StatsForAttack, target:StatsForAttack){
    let unitAcc = this.getUnitAcc(attacker,target);
    let targetAvoid = this.getAvoid(attacker, target);
    return unitAcc-targetAvoid;

  }
  private static getUnitAcc  (attacker:StatsForAttack, target:StatsForAttack){
    let weaponTri = this.weaponTriangle(attacker.weapon.type, target.weapon.type)
    let sRankBonus = 0; //todo
    let weaponTriBonus = this.getTriangleModAcc(weaponTri)
    let accuracy = attacker.weapon.hit + (attacker.skill*2) + (attacker.luck/2) +attacker.supBonus +weaponTriBonus + sRankBonus +attacker.tacticianBonus;
    return accuracy;
  }
  private static getAvoid  (attacker:StatsForAttack, target:StatsForAttack){
    let targetAttackSpeed = this.getAttackSpeed(target)
    return (targetAttackSpeed * 2) + target.luck + target.supBonus + target.tacticianBonus +target.terrainBonusEvade;
  }

  public static getBattleCritRate  (attacker:StatsForAttack, target:StatsForAttack){
    let critRate = this.getCritRate(attacker);
    let critEvade = this.getCritEvade(target);
    return critRate-critEvade
  }
  private static getCritRate  (attacker:StatsForAttack){
    let sRankBonus = 0; //todo
    return attacker.weapon.critical + (attacker.skill * 2) + attacker.supBonus + attacker.criticalBonus + sRankBonus;
  }
  private static getCritEvade  (target:StatsForAttack){
    return target.luck+target.supBonus + target.tacticianBonus;
  }



  private static weaponTriangle  (attackerWeaponType:WeaponType, targetWeaponType:WeaponType):WeaponAdvantage{
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

  private static getTriangleModAtk   (weaponAdvantage:WeaponAdvantage){
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
  private static getTriangleModAcc  (weaponAdvantage:WeaponAdvantage){
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

  private static getEffectiveCoefficient  (weaponAdvantage:WeaponAdvantage, region:Region ='english'){
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
  public static combineStateWithStats = (unit:HydratedUnit, hex:HydratedHex)=>{
    let unitBase = basesDict[unit.unitToInherit];
    let unitWithStats = {
      ...unit,
      hex,
      statsForAttack:unitBase
    }
    return unitWithStats
  }
  public static hpAfterAllAttacks  (attackResults:FullAttackStrikes, attacker:HydratedUnit, target:HydratedUnit){
    const toReturn =  {
      attackerHp:attacker.hp,
      targetHp:target.hp
    }

    for (const attackResult of attackResults) {

      //if target or attacker at 0, return;
      let attack = attackResult;
      if (attack.attacker.id === attacker.id) {
        toReturn.targetHp = toReturn.targetHp - attack.damage
      } else if (attack.target.id === target.id) {
        toReturn.attackerHp = toReturn.attackerHp - attack.damage;
      } else  {
        throw new Error('somehow attack results target nor attacker lined up with the ids')
      }

    }
    return toReturn
  }
  public static getHexesInAttackRange(attacker:UnitPlusStatsForAttack):HexStruct[]{
    let rng = attacker.statsForAttack.weapon.rng
    let hex = attacker.hex
    //get rings for each one
    if(Array.isArray(rng)){
      if(rng.length!==2){
        throw new Error('rng needs to be a tuple of min range and max range. other array lengths are not allowed');
      }
      return RangeCalculator.getCircleRange(hex,rng[1],rng[0])
    } else {
      let range = RangeCalculator.getCircleRange(hex,rng)
      return range;
    }
  }

  public static attackableFromArrayOfHexes(hexes:HexStruct[],rng:number|number[]):HexStruct[]{
    let attackableFrom = RangeCalculator.attackableFromArrayOfHexes(hexes,rng);

    return attackableFrom;
  }

}

