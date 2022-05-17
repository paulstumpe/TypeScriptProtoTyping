import LayoutClass, {LayoutStruct, makePoint, PointStruct} from "./HexGridClasses/LayoutClass";
import {HexStruct} from "./HexGridClasses/Structs/Hex";
import HexUtility from "./HexGridClasses/HexClass";

//
// const drawHexagonalBoard = (context:CanvasRenderingContext2D, frameCount:number, canvas:HTMLCanvasElement)=>{
//
//   drawGrid({
//     canvas,
//     context,
//     layout: LayoutClass.newLayout(LayoutClass.pointy, makePoint(25, 25), makePoint(0, 0))
//   });
//
//   drawGrid({
//     canvas,
//     context,
//     layout: LayoutClass.newLayout(LayoutClass.flat, makePoint(25, 25), makePoint(0, 0))
//   });
// }

export const drawHex = (context:CanvasRenderingContext2D, layout:LayoutStruct, hex: HexStruct)=> {
  let corners = LayoutClass.polygonCorners(hex,layout)
  context.beginPath();
  context.strokeStyle = "black";
  context.fillStyle = "white";
  context.lineWidth = 1;
  context.moveTo(corners[5].x, corners[5].y);
  for (let i = 0; i < 6; i++) {
    context.lineTo(corners[i].x, corners[i].y);
  }
  context.fill();
  context.stroke();
}



// drawGrid({id: "layout-test-orientation-pointy", labels: true,
//   layout: new Layout(Layout.pointy, new Point(25, 25), new Point(0, 0))});
interface DrawGrid {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
  layout: LayoutStruct,
  labels? : boolean,
  hexes: HexStruct[],
  center?: PointStruct,
}
type QRSConstructor = (q:number,r:number,s:number)=>HexStruct
function permuteQRS(q:number, r:number, s:number) {
  return HexUtility.createAndValidateNewHexStruct(q, r, s);
}


export function shapeRectangleArbitrary(w:number, h:number, constructor:QRSConstructor=permuteQRS) {
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

function colorForHex(hex:HexStruct) {
  // Match the color style used in the main article
  if (hex.q === 0 && hex.r === 0 && hex.s === 0) {
    return "hsl(0, 50%, 0%)";
  } else if (hex.q === 0) {
    return "hsl(90, 70%, 35%)";
  } else if (hex.r === 0) {
    return "hsl(200, 100%, 35%)";
  } else if (hex.s === 0) {
    return "hsl(300, 40%, 50%)";
  } else {
    return "hsl(0, 0%, 50%)";
  }
}

function drawHexLabel(ctx:CanvasRenderingContext2D, layout:LayoutStruct, hex:HexStruct):void{
  const pointSize = Math.round(0.5 * Math.min(Math.abs(layout.size.x), Math.abs(layout.size.y)));
  const center = LayoutClass.hexToPixel(hex,layout);
  ctx.fillStyle = colorForHex(hex);
  ctx.font = `${pointSize}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(HexUtility.hexLength(hex) === 0? "q,r,s" : (hex.q + "," + hex.r + "," + hex.s), center.x, center.y);
}

export function drawGrid({canvas, context, labels, layout, hexes, center, }:DrawGrid) {
  labels = labels ?? false;
  // hexes = hexes ?? shapeRectangleArbitrary(15, 15, permuteQRS);
  center = center ?? {x: 0, y: 0};
  if (!canvas) { return; }
  let ctx = context;
  ctx.fillStyle = "red"; ctx.fillRect(0, 0, 50, 50);
  var width = canvas.width;
  var height = canvas.height;
  if (window.devicePixelRatio && window.devicePixelRatio != 1) {
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width/2, height/2);
  ctx.translate(-center.x, -center.y);
  hexes.forEach(function(hex) {
    drawHex(ctx, layout, hex);
    if (labels) drawHexLabel(ctx, layout, hex);
  });
}

export default drawGrid;
