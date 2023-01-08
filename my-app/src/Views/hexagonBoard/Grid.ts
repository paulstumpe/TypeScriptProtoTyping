import LayoutClass, {
  LayoutStruct, linePointPercentageAlongLine,
  LineStruct,
  makePoint,
  PointStruct, reverseLine
} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility, {Orientation} from "../../utilities/HexGridClasses/HexClass";
import HexView from "./HexView";
import {HexesForRender} from "./createsHexesForRender";
import {basesDict} from "../../ProtoType Mechanics/unitClasses/soldier";
//drawHex should probably take a hexStyle, with a bunch of hexStyles I make in the graphics area,
//and then during render I can look at actual explicit hexproperty likes hexselect, or unit onhex and apply a mix of
//hex style based on that... maybe.

//would be better if I could take these drawings and also Handle Them closer to react. Should refactor these into react like
//composition

interface Props {
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D
  layout: LayoutStruct,
  labels? : boolean,
  hexes: HexesForRender[],
  center?: PointStruct,
}

/**
 * this class essentially serves to combine canvas or other renderer with the requisite hex knowledge
 * so, anything render related for hexes and the box do need to come in here, but I should probably keep as much
 * heavy knowledge out of this, especially as its ran once per render
 *
 * it may be possible to give each hex its render knowledge before ever passing them into this?
 * @param canvas
 * @param canvasContext
 * @param labels
 * @param layout
 * @param hexes
 * @param center
 * @param hexIdsWithUnits
 * @constructor
 */
export function Grid({canvas, canvasContext, labels=false, layout, hexes, center={x: 0, y: 0}}:Props) {
  //no canvas, need to bail
  if (!canvas) {
    return;
  }
  //draws outer rectangle
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(0, 0, 50, 50);
  //retrieves canvas width and height
  const width = canvas.width;
  const height = canvas.height;
  //sets canvas and width based on devicepixelratios  and then scales the context
  if (window.devicePixelRatio && window.devicePixelRatio != 1) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
  } else {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  //draws a second rectangle with old canvas width and height
  canvasContext.clearRect(0, 0, width, height);
  //moves to the center of the rectangle
  canvasContext.translate(width/2, height/2);
  //moves us to the center stipulated by the center point passed in
  canvasContext.translate(-center.x, -center.y);
  //loops over each hex for rendering
  let testHex = HexUtility.createAndValidateNewHexStruct(0,0,0);
  let unitHexes = [];
  hexes.forEach(function(hex) {
      //renders this hex
      HexView(canvasContext, layout, hex);
      if(hex.unit) {
        unitHexes.push(hex);
      }
  });
  //needs to be drawn after hexes
  hexes.forEach(hex=>{
    if(hex.unit){
      drawUnitOrientationArrow(hex,hex.unit.orientation,layout,canvasContext)
      drawHP(hex,layout,canvasContext,hex.unit.hp,basesDict[hex.unit.unitToInherit].hp);
    }
  })

  // drawHP(testHex,layout,canvasContext, 20, 20);

  // I can actually re render over any given hex in specific here if I want their outline to be different.
  // I can also do any other rendering here such as a line across multiples hex ect here.
  // I can also try and do an arrow here like I was thinking of trying, to show unit orientation
  // or go and draw each unit to here in its own call lol

  // drawUnitOrientationArrow(testHex,5,layout,canvasContext)
}
export const drawLine = (context:CanvasRenderingContext2D, line:LineStruct, color='black', width=1)=>{
  context.beginPath();
  context.strokeStyle=color;
  context.lineWidth=width;
  context.moveTo(line.start.x,line.start.y);
  context.lineTo(line.end.x, line.end.y);
  context.stroke();
}
export const drawArrow = (context:CanvasRenderingContext2D, line:LineStruct, color='black', width=1, edgeLengthPecent=.5)=>{
  let mainLine = line;
  //start with point mainline end, then draw a vector of ratio distance of line at x degrees rotated
  //slope is equal to rise over run, y/x.
  let side1 = rotateLineAroundPoint(mainLine, 30);
  let side1Shortened = modifyLengthByPercentageStartConstant(side1, edgeLengthPecent);
  let side2 = rotateLineAroundPoint(mainLine, -30);
  let side2Shortened = modifyLengthByPercentageStartConstant(side2, edgeLengthPecent);
  drawLine(context,mainLine, color, width);
  drawLine(context,side1Shortened, color, width);
  drawLine(context,side2Shortened, color, width);
}

export const modifyLengthByPercentageStartConstant = (line:LineStruct, decimal:number):LineStruct=>{
  const point = linePointPercentageAlongLine(line, decimal)
  let newLine = {
    start: line.start,
    end: point,
  }
  return newLine
}

export const modifyLengthByPercentageEndConstant = (line:LineStruct, decimal:number):LineStruct=>{
  line = reverseLine(line)
  const point = linePointPercentageAlongLine(line, decimal)
  let newLine = {
    start: line.start,
    end: point,
  }
  newLine = reverseLine(newLine);
  return newLine
}

export const drawUnitOrientationArrow = (hex:HexStruct, orientation:Orientation, layout:LayoutStruct, context:CanvasRenderingContext2D)=>{
  let line = lineAcrossEdgeOfHex(hex,orientation,layout);
  drawArrow(context,line, 'black',2, .4)
}

export const drawHP = (hex:HexStruct, layout:LayoutStruct, context:CanvasRenderingContext2D, hp:number, maxHP:number)=>{
  //just bar along bottom between two corners, would need to be redone for other layout prob
  let margin = 6;
  let percentHP = hp/maxHP;
  let corners = LayoutClass.polygonCorners(hex,layout);
  let leftBottom = corners[4]
  let rightBottom = corners[0]
  let edgeLength = LayoutClass.getHexEdgeLength(layout);
  let width = rightBottom.x - leftBottom.x;
  let height = edgeLength * .25;
  let rightTop = {
    x:rightBottom.x,
    y:rightBottom.y + height,
  }
  let leftTop = {
    x:leftBottom.x,
    y:leftBottom.y + height,
  }
  context.fillStyle ='blue';
  let borderSize = 2;
  //fill rect is dumb and measures height down instead of up.
  let startX = leftBottom.x +margin;
  width = width-(margin*2);
  let startY = leftBottom.y


  context.fillStyle='black'
  context.fillRect(startX, startY, width, -height);
  context.fillStyle = 'white'
  context.fillRect(startX+borderSize, startY-borderSize, width-(borderSize*2), -(height-(borderSize*2)));
  context.fillStyle = 'magenta'
  context.fillRect(startX+borderSize, startY-borderSize, (width-(borderSize*2))*percentHP, -(height-(borderSize*2)));

  // drawLine(context,{
  //   start:leftBottom,
  //   end:rightBottom,
  // },'red',2);
}

export const lineAcrossEdgeOfHex = (hex:HexStruct, orientation:Orientation, layout:LayoutStruct)=>{
  let apothem = LayoutClass.getApothem(hex,layout,orientation);
  // drawLine(canvasContext,apothem)
  let invertApothem = reverseLine(apothem);
  //shorten apothem for appearance
  invertApothem = modifyLengthByPercentageStartConstant(invertApothem, .5)
  invertApothem = modifyLengthByPercentageEndConstant(invertApothem, 1/.5)
  return invertApothem;
}

export const lineBetweenTwoHexes = (startHex:HexStruct, endHex:HexStruct, layout:LayoutStruct):LineStruct=>{
  return {
    start:LayoutClass.hexToPixel(startHex, layout),
    end:LayoutClass.hexToPixel(endHex, layout),
  }
}

export const rotateLineAroundPoint = (line:LineStruct,degreesToRotate:number):LineStruct=>{
  // x1 = x0cos(θ) – y0sin(θ)(Equation 1)
  // y1 = x0sin(θ) + y0cos(θ)
  let rotationAnchor = line.start;
  let cx = line.start.x;
  let cy = line.start.y
  let x = line.end.x;
  let y = line.end.y;
  let pointToRotate = line.end;
  let radiansToRotate = degreesToRadian(degreesToRotate);
  let cos = Math.cos(radiansToRotate)
  let sin = Math.sin(radiansToRotate);
    // let temp;
  // for( let n=0; n<x.length; n++ ){
    let temp = ((x-cx)*cos - (y-cy)*sin) + cx;
    y = ((x-cx)*sin + (y-cy)*cos) + cy;
    x = temp;
  // }
  let newLineEnd = {
    x,
    y,
  }
  return {
    start:line.start,
    end: newLineEnd,
  }

}

export const degreesToRadian = (degrees:number)=>{
  return degrees * (Math.PI/180);
}
//todo make this and grid use the same underlying function or constants
//converts from canvas to grid?
export const canvasToGrid = (canvas:HTMLCanvasElement,nativeCanvasClick:PointStruct,layOut:LayoutStruct)=>{
  //figures out pixel ratio for the device
  let devicePixelRatio = 1;
  if (window.devicePixelRatio && window.devicePixelRatio != 1) {
    devicePixelRatio =  window.devicePixelRatio;
  }

  //umm?
  let locationOfNewOriginOnOldPlane = makePoint(canvas.width/2/devicePixelRatio, canvas.height/2/devicePixelRatio)
  //uses location of the new origin on old plane and calculates it against the native canvas click to create
  //a point that respects the new origin
  let pointWithRespectToNewOrigin = makePoint(
    nativeCanvasClick.x - locationOfNewOriginOnOldPlane.x,
    nativeCanvasClick.y - locationOfNewOriginOnOldPlane.y
  )
  // runs the calculated point against our layout to return a hex that contains the click
  let hex = LayoutClass.pixelToHex(pointWithRespectToNewOrigin, layOut)

  //rounds to whole hex coordinates, and then returns the value
  return HexUtility.hexRound(hex)
}

export default Grid;
