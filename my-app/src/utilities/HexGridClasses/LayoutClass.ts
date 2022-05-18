/**
 * o draw hexes on the screen, I need a way to convert hex coordinates into screen space.
 * I’ll call this the Layout class.
 * The main article doesn’t cover some of the additional features I want:
   * Support y-axis pointing down (common in 2d libraries) as well as
   * y-axis pointing up (common in 3d libraries). The main article only covers y-axis pointing down.
   * Support stretched or squashed hexes, which are common with pixel graphics. The main article only supports equilateral hexes.
   * Support the 0,0 hex being located on the screen anywhere.
   * The main article always places the 0,0 hex at x=0, y=0.
 *
 * I also need a way to convert mouse clicks and other pixel coordinates back into hex coordinates.
 * I will put this into the Layout class. The same things I need to deal with
 * for hex to screen (y-axis direction, stretch/squash, origin) have to be dealt with
 * for screen to hex, so it makes sense to put them together.
 */
import {HexStruct} from "./Structs/Hex";
import HexUtility, {HexConstructer} from "./HexClass";
import HexClass from "./HexClass";


/**
 * In flat top:
 * The arrow (0,0)→(1,0) is the q basis vector (x=3/2, y=sqrt(3)/2)
 * and (0,0)→(0,1) is the r basis vector (x=0, y=sqrt(3)).
 *
 * but in pointy top:
 * The arrow (0,0)→(1,0) is the q basis vector (x=sqrt(3), y=0)
 * and (0,0)→(0,1) is the r basis vector (x=sqrt(3)/2, y=3/2)
 *
 * so f 0 through 4 really represent constants in the axial hex coordinates to pixel conversion
 *
 * the matrix inverse is used to calculate pixeltohex, and that is stored here as b0 through b3,
 *
 *
 * To draw a hex, I need to know where each corner is relative to the center of the hex.
 * With the flat top orientation, the corners are at 0°, 60°, 120°, 180°, 240°, 300°.
 * With pointy top, they’re at 30°, 90°, 150°, 210°, 270°, 330°. I encode that in the
 * Orientation class’s start_angle value, either 0.0 for 0° or 0.5 for 60°.
 *
 */
export interface OrientationStruct {
  f0: number,
  f1: number,
  f2: number,
  f3: number,
  b0: number,
  b1: number,
  b2: number,
  b3: number,
  startAngle: number,
}

export interface PointStruct {
  x:number,
  y:number
}

export interface LayoutStruct {
  orientation: OrientationStruct,
  size : PointStruct,
  origin : PointStruct,
}
export function makePoint (x:number,y:number): PointStruct{
  return {
    x,
    y
  }
}
export default class LayoutClass {

  public static pointy:OrientationStruct = {
     f0: Math.sqrt(3.0),
     f1: Math.sqrt(3.0) / 2.0,
     f2: 0.0,
     f3: 3.0 / 2.0,
     b0: Math.sqrt(3.0)/ 3.0,
     b1: -1.0 / 3.0,
     b2: 0.0,
     b3: 2.0 / 3.0,
     startAngle: 0.5
  }
  public static flat: OrientationStruct = {
    f0: 3.0 / 2.0,
    f1: 0.0,
    f2: Math.sqrt(3.0) / 2.0,
    f3: Math.sqrt(3.0),
    b0: 2.0 / 3.0,
    b1: 0.0,
    b2: -1.0 / 3.0,
    b3: Math.sqrt(3.0) / 3.0,
    startAngle: 0.0
  }

  public static newLayout (orientation: OrientationStruct, size:PointStruct, origin: PointStruct):LayoutStruct{
    return {
      orientation,
      size,
      origin
    }
  }
  // https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial
  //You can use a negative value for the y size to flip the y axis.
  public static hexToPixel (hex:HexStruct, layout:LayoutStruct):PointStruct{
    const {orientation, size, origin} = layout
    let x = (orientation.f0 * hex.q + orientation.f1 * hex.r) * size.x;
    let y = (orientation.f2 * hex.q + orientation.f3 * hex.r) * size.y;
    return {
      x: x+origin.x,
      y: y+origin.y
    }

  }


  public static pixelToHex (point:PointStruct, layout: LayoutStruct):HexStruct {
    const {orientation, size, origin} = layout;
    const {b0, b1, b2, b3} = orientation;
    const newPoint = {
      x : (point.x - origin.x) / size.x,
      y : (point.y - origin.y) / size.y,
    }
    const q = b0 * newPoint.x + b1 * newPoint.y;
    const r = b2 * newPoint.x + b3 * newPoint.y;
    return HexUtility.createAndValidateNewHexStruct(q, r, -q - r)
  }

  // Once I know where the corners are relative to the center, I can calculate
  // the corners in screen locations by adding the center to each corner,
  // and putting the coordinates into an array.
  public static hexCornerOffset (corner:number, layout: LayoutStruct):PointStruct
  {
    const {orientation, size} = layout;
    const angle = 2.0 * Math.PI * (orientation.startAngle - corner) / 6.0;
    return {
      x : size.x * Math.cos(angle),
      y : size.y * Math.sin(angle),
    };
  }


  public static polygonCorners(hex:HexStruct, layout: LayoutStruct):PointStruct[]
  {
    const corners:PointStruct[] = [];
    const center:PointStruct = LayoutClass.hexToPixel(hex, layout);
    for (let i = 0; i < 6; i++)
    {
      const offset = LayoutClass.hexCornerOffset(i, layout);
      const point = {
        x: center.x + offset.x,
        y: center.y + offset.y
      }
      corners.push(point);
    }
    return corners;
  }
  /**
   * takes in a width and height, and uses those to generate one array of hexes, containing one for each qrs point
   *
   **/

  public static shapeRectangleArbitrary(w:number, h:number, constructor:HexConstructer=HexUtility.createAndValidateNewHexStruct) {
    var hexes = [];
    var i1 = -Math.floor(w/2), i2 = i1 + w;
    var j1 = -Math.floor(h/2), j2 = j1 + h;
    for (var j = j1; j < j2; j++) {
      var jOffset = -Math.floor(j/2);
      for (var i = i1 + jOffset; i < i2 + jOffset; i++) {
        hexes.push(constructor(i, j, -i-j));
      }
    }
    return hexes;
  }
}
