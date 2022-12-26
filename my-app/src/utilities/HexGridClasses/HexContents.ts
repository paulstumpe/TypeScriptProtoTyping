import hexClass from "./HexClass";
import {HexStruct} from "./Structs/Hex";

export class Unit {
  public health?: number;
  public name?:string;
  public hex?: HexStruct;
  public playerOwner?: string;
}

export default class HexContents {
  public unit?: Unit;
  public terrain: [] = [];
}
