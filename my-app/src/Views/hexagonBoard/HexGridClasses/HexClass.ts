/**
 * Since most of the algorithms work with cube coordinates, I’ll need a data structure for
 * cube coordinates, along with algorithms that work with them. I’ll call HexUtility the Hex class.
 * https://www.redblobgames.com/grids/hexagons/implementation.html
 */
import {AxialHexStruct, HexStruct} from "./Structs/Hex";

//idea, union type of all my hex structs, and a Seperate converter library that all
//my hex classes call to transform the hex into the type they work with.


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


}


export default HexUtility
