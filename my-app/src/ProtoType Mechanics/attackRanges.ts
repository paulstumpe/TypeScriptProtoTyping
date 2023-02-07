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


  public static getCircleRange(hex:HexStruct,maxDistance:number, minDistance:number=1){
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




}


export default {}
