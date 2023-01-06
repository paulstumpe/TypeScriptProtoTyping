/**
 * Since most of the algorithms work with cube coordinates, I’ll need a data structure for
 * cube coordinates, along with algorithms that work with them. I’ll call HexUtility the Hex class.
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
import {AxialHexStruct, HexStruct} from "./Structs/Hex";

//idea, union type of all my hex structs, and a Seperate converter library that all
//my hex classes call to transform the hex into the type they work with.

export type HexConstructer = (q:number,r:number,s:number)=>HexStruct
export type Orientation = 0 | 1 | 2 |3 | 4 | 5;
export const orientationArr:Orientation[] = [0,1,2,3,4,5];

class HexUtility {
  /**
   * confirms that q , r , s currently add up to zero
   * @private
   */
  public static validateZeroConstraint(hex: HexStruct):void {
    let { q, r, s } = hex
    if (0 !== q + r + s){
      console.log(hex)
      throw new Error('Zero Constraint Broken: ')
    }
  }

  public static HexFromAxial(axialVector : AxialHexStruct):HexStruct{
    const {q, r} = axialVector
    const s = -q -r;
    const newHex = {
      q,
      r,
      s
    }
    HexUtility.validateZeroConstraint(newHex)
    return newHex;
  }

  public static HexFromOffset(){
    console.log('todo');
  }

  /**
   *     id format"qnumrnum"
    * @param id
   */
  public static hexFromId(id:string):HexStruct{
    let idWithoutQ = id.slice(1);
    let tuple = idWithoutQ.split('r').map(str=>parseInt(str));
    let [q,r] = tuple;
    return HexUtility.createAndValidateNewHexStruct(q, r, -q - r);
  }
  public static hexIdFromHex(hex:HexStruct):string{
    return `q${hex.q}r${hex.r}`;
  }
  /**
   * @param a
   * @param b
   * @return boolean true if hexes are equal
   */
  public static equalTo( a : HexStruct, b: HexStruct): boolean{
    return (
      a.q === b.q &&
      a.r === b.r &&
      a.s === b.s
    )
  }


  public static isEqualWithUndefined = (a:HexStruct, b?:HexStruct):boolean=>{
    if(b) {
      if (HexUtility.equalTo(a,b)){
        return true;
      }
    }
    return false;
  }


  public static hexIsInArray(hex:HexStruct, arr:HexStruct[]){
    return arr.reduce<boolean>((found, hexB)=>{
      if(this.equalTo(hex, hexB)){
        found = true;
      }
      return found;
    },false)
  }

  public static hexAdd( a : HexStruct, b: HexStruct): HexStruct{
    return  HexUtility.createAndValidateNewHexStruct(
      a.q + b.q,
      a.r + b.r,
      a.s + b.s,
    )
  }

  public static hexSubtract( a : HexStruct, b: HexStruct): HexStruct{
    return  HexUtility.createAndValidateNewHexStruct(
      a.q - b.q,
      a.r - b.r,
      a.s - b.s,
    )
  }

  public static hexMultiply( a : HexStruct, k: number): HexStruct{
    return HexUtility.createAndValidateNewHexStruct(
      a.q * k,
      a.r * k,
      a.s * k
    )
  }

  /**
   * ref: https://www.redblobgames.com/grids/hexagons/#distances
   * @param hex
   */
  public static hexLength(hex : HexStruct): number{
    const { q, r, s } = hex
    const absoluteSum = Math.abs(q) + Math.abs(r) + Math.abs(s)
    return (absoluteSum / 2)
  }

  /**
   * ref https://www.redblobgames.com/grids/hexagons/#distances
   * @param a
   * @param b
   */
  public static hexDistance( a : HexStruct, b : HexStruct): number {
    return HexUtility.hexLength(HexUtility.hexSubtract(a, b));
  }

  /**
   * directions are a set of 6 neighbors, from 0 to 5, offset by one from a hex of 0,0,0
   */
  public static directions:HexStruct[] = [
    HexUtility.createAndValidateNewHexStruct(1,0,-1),
    HexUtility.createAndValidateNewHexStruct(1,-1,0),
    HexUtility.createAndValidateNewHexStruct(0,-1,1),
    HexUtility.createAndValidateNewHexStruct(-1, 0, 1),
    HexUtility.createAndValidateNewHexStruct(-1, 1, 0),
    HexUtility.createAndValidateNewHexStruct(0, 1, -1),
  ];


  // https://www.redblobgames.com/grids/hexagons/#neighbors
  public static hexDirection(direction:number):HexStruct {
    if (direction>5){
      throw new Error('direction greater than five given')
      // HexUtility.directions[(6 + (direction % 6)) % 6]
    }
    return HexUtility.directions[direction]
  }
  // https://www.redblobgames.com/grids/hexagons/#neighbors
  /**
   * returns the hexstruct of the hex in the given direction
   * @param hex
   * @param direction
   */
  public static hexNeighbor( hex:HexStruct, direction:number):HexStruct {
    return HexUtility.hexAdd( hex, HexUtility.hexDirection(direction))
  }

  public static allNeighbors(hex:HexStruct){
    let neighbors = [];
    for(let i =0; i<6; i++){
      neighbors.push(this.hexNeighbor(hex,i));
    }
    return neighbors;
  }

  // To make directions outside the range 0..5 work, use hex_directions[(6 + (direction % 6)) % 6].
  // Yeah, it’s ugly, but it will work with negative directions too.
  // (Side note: it would’ve been nice to have a modulo operator in C++.)
  //

  public static createAndValidateNewHexStruct (q :number, r: number, s: number) : HexStruct{
    let newHex = {
      q,
      r,
      s,
    }
    HexUtility.validateZeroConstraint(newHex)
    return newHex;
  }
  //rounds a fraction hex to a standard hex
  public static hexRound (hex:HexStruct):HexStruct{
    let q = Math.round(hex.q);
    let r = Math.round(hex.r);
    let s = Math.round(hex.s);
    let qDiff = Math.abs(q - hex.q);
    let rDiff = Math.abs(r - hex.r);
    let sDiff = Math.abs(s - hex.s);
        if (qDiff > rDiff && qDiff > sDiff) {
            q = -r - s;
        } else if (rDiff > sDiff) {
            r = -q - s;
        } else {
            s = -q - r;
        }
    return HexUtility.createAndValidateNewHexStruct(q, r, s);
  }

  public static lerp(a:number, b:number, t:number):number{
    return a * (1-t) + b * t;

    /* better for floating point precision than
       a + (b - a) * t, which is what I usually write */
  }

  //linear interpolate hex
  //returns a fractional hex
  public static hexLerp (a:HexStruct, b:HexStruct, t: number) :HexStruct {
    return this.createAndValidateNewHexStruct(
      HexUtility.lerp(a.q, b.q, t),
      HexUtility.lerp(a.r, b.r, t),
      HexUtility.lerp(a.s, b.s, t)
    );
  }

  /**
   *    I needed to stick that max(N, 1) bit in there to handle lines with length 0 (when A == B).
   *    Sometimes the hex_lerp will output a point that’s on an edge. On some systems, the rounding code
   *    will push that to one side or the other, somewhat unpredictably and inconsistently.
   *    To make it always push these points in the same direction, add an “epsilon” value to a.
   *    This will “nudge” things in the same direction when it’s on an edge,
   *    and leave other points unaffected.
   * @param a
   * @param b
   */
  public static hexLineDraw(a:HexStruct, b:HexStruct) {
    let n = HexUtility.hexDistance(a,b);
    let aNudge = HexUtility.createAndValidateNewHexStruct(
      a.q + 1e-06,
      a.r + 1e-06,
      a.s - 2e-06
    );
    let bNudge = HexUtility.createAndValidateNewHexStruct(
      b.q + 1e-06,
      b.r + 1e-06,
      b.s - 2e-06
    );
    let results = [];
    let step = 1.0 / Math.max(n, 1);
    for (let i = 0; i <= n; i++) {
      const res1 = HexUtility.hexRound(HexUtility.hexLerp(aNudge, bNudge, step * i));
      results.push(res1);
    }
    return results;
  }

  public static getRing(center:HexStruct, radius:number){
    const hexes = [];
    // let startingHex = HexUtility.hexMultiply(center, radius);
    let hex = HexUtility.hexAdd(center, HexUtility.hexMultiply(HexUtility.directions[4],radius));
    for(let i=0; i<6; i++){
      for (let j=0; j<radius; j++){
        hexes.push(hex)
        hex = HexUtility.hexNeighbor(hex,i);
      }
    }
    return hexes;
  }

  public static getPreviousOrientation(i:Orientation):Orientation{
    if(i===0){
      return orientationArr[5];
    }
    return orientationArr[i-1]
  }


}


export default HexUtility
