import {StatsForAttack} from "../unitClasses/soldier";
import {WeaponType} from "../weapons";
import {HydratedUnit} from "../../store/slices/unitsSlice";


let physical = ['sword', 'lance', 'axe', 'bow'];
let magic = ['stave', 'animaTome', 'darkTome', 'lightTome'];
export type AttackType = 'physical' | 'magic'
export type Region = 'english' | 'japan'


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

export type WeaponAdvantage =   'goodAgainst' | 'weakAgainst' | 'neutral'

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
  public static attackFull (attacker:StatsForAttack, target:StatsForAttack, counterStrikeInRange:boolean, rngArr:number[]):FullAttackResults{
    let attackSpeedAttacker = this.getAttackSpeed(attacker);
    let attackSpeedTarget = this.getAttackSpeed(target);
    let attackerIsDoubleAttack = this.doubleAttackIf(attackSpeedAttacker,attackSpeedTarget);
    let targetIsDoubleAttack = this.doubleAttackIf(attackSpeedTarget, attackSpeedAttacker);
    //first attack
    let firstAttack = this.AttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
    let fullAttackResults:FullAttackResults = {
      firstAttack
    }
    //counterStrike
    if(counterStrikeInRange){
      let counterAttack = this.AttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
      fullAttackResults.counterAttack = counterAttack;
      //second attack
      if(targetIsDoubleAttack){
        fullAttackResults.secondCounterAttack = this.AttackStrike(target,attacker, rngArr.pop(), rngArr.pop());
      }
    }

    //second attack
    if(attackerIsDoubleAttack){
      fullAttackResults.secondAttack = this.AttackStrike(attacker,target, rngArr.pop(), rngArr.pop());
    }

    return fullAttackResults
  }



  private static AttackStrike (attacker:StatsForAttack, target:StatsForAttack, hitRng:number|undefined, critRng:number|undefined):AttackResults{
    if(hitRng===undefined || critRng===undefined){
      throw Error('rng was not a number somehow')
    }

    let attackerBattleCritRate = this.getBattleCritRate(attacker,target);
    let isCritical = attackerBattleCritRate > critRng;
    let attackerBattleAcc = this.getBattleAcc(attacker,target);
    let hit = attackerBattleAcc > hitRng;
    let damage = 0;
    if(hit){
      damage = this.getDamage(attacker,target, isCritical);
    }
    return {
      hit,
      isCritical,
      damage,
    }
  }

  private static doubleAttackIf (attackerAtkSpeed:number, targetAtkSpeed:number):boolean{
    let spdDif = attackerAtkSpeed-targetAtkSpeed;
    return spdDif >= 4;
  }

  private static getAttackSpeed  (attacker:StatsForAttack){
    let {weapon, con, speed} = attacker;
    let {weight} = weapon;
    let weaponCont = weight-con;
    if (weaponCont<0){
      weaponCont=0;
    }
    let atkspeed = speed-(weaponCont);
    return atkspeed;
  }

  private static getDamage  (attacker:StatsForAttack, target:StatsForAttack, critical:boolean){
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
    return target.defense + target.supBonus + target.terrainBonus
  }

  private static getDefMagical  (target:StatsForAttack){
    return target.resistance + target.supBonus +target.terrainBonus
  }

  private static getBattleAcc  (attacker:StatsForAttack, target:StatsForAttack){
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
    return (targetAttackSpeed * 2) + target.luck + target.supBonus + target.tacticianBonus;
  }

  private static getBattleCritRate  (attacker:StatsForAttack, target:StatsForAttack){
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

  public static analyzeFullAttackResults  (attackResults:FullAttackResults, attacker:HydratedUnit, target:HydratedUnit){
    const {firstAttack,secondAttack,counterAttack,secondCounterAttack} = attackResults
    let attackerHp =attacker.hp;
    let targetHp = target.hp;

    targetHp = this.analyzeAttackResult(targetHp,firstAttack)
    if(targetHp <=0){
      return {
        attackerHp,
        targetHp
      }
    }

    if(counterAttack){
      attackerHp = this.analyzeAttackResult(attackerHp,counterAttack)
      if(attackerHp <=0){
        return {
          attackerHp,
          targetHp
        }
      }
    }

    if(secondCounterAttack){
      attackerHp = this.analyzeAttackResult(attackerHp,secondCounterAttack)
      if(attackerHp <=0){
        return {
          attackerHp,
          targetHp
        }
      }
    }

    if(secondAttack){
      targetHp = this.analyzeAttackResult(targetHp,secondAttack)
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

  private static analyzeAttackResult  (targetHP:number, attackResults:AttackResults){
    return targetHP-attackResults.damage;
  }

}

