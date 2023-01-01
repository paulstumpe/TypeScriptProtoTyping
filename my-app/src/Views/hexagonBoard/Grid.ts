import LayoutClass, {LayoutStruct, makePoint, PointStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import HexView from "./HexView";
import {selectHex} from "../../store/slices/hexSlice";
import {store} from "../../store/store";
import {getSelectedHex} from "../../store/slices/uiSlice";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";
import {HexesForRender} from "./createsHexesForRender";
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
  hexes.forEach(function(hex) {
      //renders this hex
      HexView(canvasContext, layout, hex);
  });
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
  console.log(window.devicePixelRatio)
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
