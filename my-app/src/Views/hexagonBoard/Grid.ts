import LayoutClass, {LayoutStruct, makePoint, PointStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import HexView from "./HexView";
import HexLabel from "./HexLabel";
import MapClass from "../../utilities/HexGridClasses/MapClass";
import Map from "../../utilities/HexGridClasses/MapClass";
import HexContents, {Unit} from "../../utilities/HexGridClasses/HexContents";
//drawHex should probably take a hexStyle, with a bunch of hexStyles I make in the graphics area,
//and then during render I can look at actual explicit hexproperty likes hexselect, or unit onhex and apply a mix of
//hex style based on that... maybe.

//would be better if I could take these drawings and also Handle Them closer to react. Should refactor these into react like
//composition

interface Props {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
  layout: LayoutStruct,
  labels? : boolean,
  hexes: HexStruct[],
  center?: PointStruct,
  selectedHex?: HexStruct
}
export function Grid({canvas, context, labels=false, layout, hexes, center={x: 0, y: 0}, selectedHex}:Props) {
  if (!canvas) { return; }
  const ctx = context;
  ctx.fillStyle = "red"; ctx.fillRect(0, 0, 50, 50);
  const width = canvas.width;
  const height = canvas.height;
  if (window.devicePixelRatio && window.devicePixelRatio != 1) {
  // if (window.devicePixelRatio && window.devicePixelRatio === 1) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    //this is my fucking problem. i'm setting canvas width and height but not setting the
    // width and height i'm actually passing to context.
    //i'm almost positive this is where the issue is
    //the program only works right when i'm hitting this if block, otherwise it's f'd up for some reason
    // i think because otherwise i never set canvas width and height maybe???
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  } else {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    //this is my fucking problem. i'm setting canvas width and height but not setting the
    // width and height i'm actually passing to context.
    //i'm almost positive this is where the issue is
    //the program only works right when i'm hitting this if block, otherwise it's f'd up for some reason
    // i think because otherwise i never set canvas width and height maybe???
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width/2, height/2);
  ctx.translate(-center.x, -center.y);

  //right now we check if selected, probably more appropriate to grab from map or wherever we decide to hold this info and pass in the relevant data to the hex
  let map = new Map();
  if(selectedHex){
    let unit = new Unit();
    unit.name ="test";
    unit.health=10;
    unit.playerOwner="testplayer";
    let hexContents = new HexContents();
    hexContents.unit = unit;

    map.setHex(selectedHex,hexContents);
  }



  hexes.forEach(function(hex) {

    if(selectedHex && HexUtility.equalTo(hex, selectedHex)){
      let content = map.getHex(selectedHex)
      HexView(ctx, layout, hex, labels,'red', 'blue', content);
    } else {
      HexView(ctx, layout, hex, labels);
    }
  });
}

//todo make this and grid use the same underlying function or constants
export const canvasToGrid = (canvas:HTMLCanvasElement,nativeCanvasClick:PointStruct,layOut:LayoutStruct)=>{
  let devicePixelRatio = 1;
  if (window.devicePixelRatio && window.devicePixelRatio != 1) {
    devicePixelRatio =  window.devicePixelRatio;
  }
  let locationOfNewOriginOnOldPlane = makePoint(canvas.width/2/devicePixelRatio, canvas.height/2/devicePixelRatio)
  console.log(window.devicePixelRatio)
  let pointWithRespectToNewOrigin = makePoint(
    nativeCanvasClick.x - locationOfNewOriginOnOldPlane.x,
    nativeCanvasClick.y - locationOfNewOriginOnOldPlane.y
  )
  // HexUtility.
  let hex = LayoutClass.pixelToHex(pointWithRespectToNewOrigin, layOut)
  return HexUtility.hexRound(hex)
}

export default Grid;
