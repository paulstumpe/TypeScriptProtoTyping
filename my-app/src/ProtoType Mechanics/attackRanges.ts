// okay so range doesn't really belong to a unit, it belongs to an action
// that action might belong to a weapon, like attacks and counter attacks in
//fire emblem,
//it might belong to an ability/spell. but yeah range is not a function of unit

//okay, so next, range is really just an equation to determine what an ability can target
//it could be relative to the user is or where the target is or both,
//that means there are likely types of functions we migth use or combine as functions for
//a range, such as radius from hex, line from hex, any enemy unit, any ally unit,
//line of sight, ect.

//so range should be described via a keyword, and depending on the keyword, range
//should may have further parameters describing it



import {HexStruct} from "../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../utilities/HexGridClasses/HexClass";

export const rangeKeywords = [
  'circle',
  'line',
  'lineOfSight',
  'unlimited',
] as const;
export type Range = typeof rangeKeywords[number];

export class RangeCalculator{


  public static getCircleRange(hex:HexStruct,maxDistance:number, minDistance:number=1):HexStruct[]{
    this.validateGetCircleRangeProps(hex,maxDistance,minDistance)
    let inRange:HexStruct[] = [];
    for(let i = minDistance; i<=maxDistance;i++){
      let ring = HexUtility.getRing(hex,i);
      ring.forEach(ringHex=>inRange.push(ringHex))
    }
    return inRange;
  }



  private static validateGetCircleRangeProps(hex:HexStruct,maxDistance:number,minDistance:number){
    if(minDistance>maxDistance){
      throw new Error('mindistance can not be greater than maxdistance')
    }
    if(minDistance<1 || maxDistance<1){
      throw new Error('range can not be less than 1')
    }
  }




  //todo update to actually use radius
  public static attackableFromHex = (hex:HexStruct, attackRange:number|number[]):HexStruct[]=>{
    if(Array.isArray(attackRange)){
      if(attackRange.length!==2){
        throw new Error('rng needs to be a tuple of min range and max range. other array lengths are not allowed');
      }
      return RangeCalculator.getCircleRange(hex,attackRange[1],attackRange[0])
    } else {
      let range = RangeCalculator.getCircleRange(hex,attackRange)
      return range;
    }
  }

  //calculate move array first, then feed move array through this
  public static attackableFromArrayOfHexes = (hexes:HexStruct[], attackRange:number|number[]):HexStruct[]=>{
    //so this is basically, getting all movable hexes, and then running attack out from those hexes, and then making a unique array of those
    //and returning that?
    //my first idea is super inneficient...
    //todo make more efficient algorithm answer
    const attackable:HexStruct[] = []
    hexes.forEach(hexA=>{
      let attackableFromCurrentHex = RangeCalculator.attackableFromHex(hexA,attackRange);
      attackableFromCurrentHex.forEach(hexB=>{
        let inAttackable = HexUtility.hexIsInArray(hexB,attackable)
        if(!inAttackable){
          attackable.push(hexB);
        }
      })
    })
    return attackable
  }



}


export default {}
