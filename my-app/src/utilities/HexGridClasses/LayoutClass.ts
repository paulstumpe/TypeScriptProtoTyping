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
import HexUtility, {HexConstructer, Orientation} from "./HexClass";
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

export interface LineStruct {
  start:PointStruct,
  end:PointStruct,
}

/**
 * size is the radius of a circle(or oval if the hexes are streched on the x or y axis) that would touch the corners of the hexagon
 */
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

/**
 *
 */
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


  /**
   * generates the pixel coordinates for a single hex
   * one issues with this in terms of rendering is when I am drawing my hexes the lines for each hex actually overlap,
   * so the strokes that draw a a hex after the first will draw over the previous strokes so stroke color
   * can't actually be different unless I find a way to adress this.
   *
   * on pointy slice the first line is the very bottom of the hex
   * 5 is the bottom of the hex. 0 is the first point to the right.
   *
   * on flat, 5 is the bottom right and  0 is the next point to the right.
   * @param hex
   * @param layout
   */
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



//In the flat top orientation, the horizontal distance between adjacent hexagons centers is horiz = 3/4 * width = 3/2 * size. The vertical distance is vert = height = sqrt(3) * size.

  public static getHexEdge(hex:HexStruct, layout:LayoutStruct, side1:Orientation):LineStruct{
    let side2 = HexUtility.getPreviousOrientation(side1);
    const corners = this.polygonCorners(hex, layout);
    const start = corners[side2]
    const end = corners[side1]
    const line = {
      start,
      end,
    }
    return line;
  }
  public static getHexEdgeLength(layout:LayoutStruct):number{
    let hex = HexUtility.createAndValidateNewHexStruct(0,0,0);
    let edge = this.getHexEdge(hex,layout,0);
    return lineLength(edge);
  }

  /**
   * inCircle is a technical term related to hexagons for the circle whos radius when overlapped with the cernter of the hex
   * would have its edges would overlap with the edges/apothem of the hex
   */
  public static getHexInCircleRadius(){

  }

  public static getHexEdgeCenter(hex:HexStruct, layout:LayoutStruct, side1:Orientation):PointStruct{
    let edge = this.getHexEdge(hex,layout,side1);
    return lineMidPoint(edge);
  }

  public static getApothem(hex:HexStruct, layout:LayoutStruct, side1:Orientation){
    let edgeCenter = this.getHexEdgeCenter(hex, layout, side1);;
    let center = this.hexToPixel(hex,layout);
    let line = {
      start: center,
      end: edgeCenter,
    }
    return line;
  }

  public static getApothemLength(hex:HexStruct, layout:LayoutStruct, side1:Orientation){
    let apothem = this.getApothem(hex,layout,side1);
    let apothemLength = lineLength(apothem);
    return apothem;
  }

  public static getHexCorner(){

  }
//
// In the pointy top orientation, the horizontal distance between adjacent hexagon centers is horiz = width = sqrt(3) * size. The vertical distance is vert == 3/4 * height == 3/2 * size.


  /**
   * takes in a width and height, and uses those to generate one array of hexes, containing one for each qrs point
   *
   **/

  public static shapeRectangleArbitrary(verticalHexes:number, horizontalHexes:number, constructor:HexConstructer=HexUtility.createAndValidateNewHexStruct) {
    var hexes = [];
    var i1 = -Math.floor(verticalHexes/2), i2 = i1 + verticalHexes;
    var j1 = -Math.floor(horizontalHexes/2), j2 = j1 + horizontalHexes;
    for (var j = j1; j < j2; j++) {
      var jOffset = -Math.floor(j/2);
      for (var i = i1 + jOffset; i < i2 + jOffset; i++) {
        hexes.push(constructor(i, j, -i-j));
      }
    }
    return hexes;
  }

}
export const lineMidPoint = (line:LineStruct):PointStruct=>{

  return linePointPercentageAlongLine(line, .5)
}

export const linePointPercentageAlongLine = (line:LineStruct, decimal:number):PointStruct=>{

  let xDist = line.end.x - line.start.x;
  let yDist = line.end.y - line.start.y;
  // let pthag = Math.sqrt(xDist * xDist + yDist * yDist);
  let p = {
    x: line.start.x + xDist * decimal,
    y: line.start.y + yDist * decimal
  }
  return p;
}

export const lineLength = (line:LineStruct)=>{
  let xDist = line.end.x - line.start.x;
  let yDist = line.end.y - line.start.y;
  let pthag = Math.sqrt(xDist * xDist + yDist * yDist);
  return pthag;
}

export const reverseLine = (line:LineStruct):LineStruct=>{
  return {
    start:line.end,
    end:line.start,
  }
}
