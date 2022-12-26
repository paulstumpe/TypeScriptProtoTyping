/**
 * A grid map will likely need additional storage for terrain, objects, units, etc. A 2d array can be used
 * but it’s not always straightforward, so I’ll create a Map class for this.
 */
import {HexStruct} from "./Structs/Hex";
import HexClass from "./HexClass";
import HexContents from "./HexContents";


//an object is the simplest way to store the units for look up
interface rArr {

}
interface HexesMatrix {
  qArr: []
}

class Map {
  private hexes:HexContents[][] = [];
  public getHex(hex:HexStruct):HexContents{
    return this.hexes[hex.q][hex.r];
  }
  public setHex (hex:HexStruct, content:HexContents):HexContents{
    this.hexes[hex.q][hex.r] = content;
    return content;
  }
}

export default Map;
