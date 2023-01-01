import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexLabel, {HexLabelProps, PartialLabelProps} from "./HexLabel";
import {HydratedHex, selectHex} from "../../store/slices/hexSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {store} from "../../store/store";
import {getSelectedHex} from "../../store/slices/uiSlice";
import renderHex, {partialHexProps} from "./renderHex";
import {HexesForRender} from "./createsHexesForRender";


/**
 * should make per hex render decisions and describe the render of a hex,
 * but in render engine nuetral terms, and then pass that to the renderer to be translated
 * to engine appropriate terms
 * @param context
 * @param layout
 * @param hex
 * @param movable
 * @constructor
 */
 const HexView = (
  context:CanvasRenderingContext2D,
  layout:LayoutStruct,
  hex: HexesForRender,
)=>{
   //this probably shouldn't be accessing state. hexes should have all the needed logic for the renderer before we're going through render cycles imo
   // let state = store.getState()
   // let hexState = selectHex(state, hex)
   // let selectedHex = getSelectedHex(state);
  const { selected, unit, terrain, movable, moused} = hex
   let labelVisuals:PartialLabelProps = {}
   let hexVisuals:partialHexProps = {}


   let terrainText: string|undefined = ''
   let unitText: string|undefined = ''

   //set color of font and tile based on terrain
   switch (terrain) {
     case "grass" :
       // labelVisuals.fillStyle="white";
       hexVisuals.fillStyle="springgreen";
       terrainText = terrain;
       break;
   }

   //set outline based on occupied and selected
   if(unit){
     unitText = unit.name;
     hexVisuals.fillStyle = 'aquamarine'
   }
   if (movable){
     hexVisuals.fillStyle = 'red';
   }
   if(selected){
    hexVisuals.fillStyle = 'yellow';
   }
  if(moused){
    hexVisuals.fillStyle = 'lightgoldenrodyellow';
  }
   if (terrainText || unitText) {
     labelVisuals.fillStyle = 'black';
     labelVisuals.text = unitText || terrainText;
   }

   // hexVisuals.fillStyle


   //todo create all the conditional logic i want that will decide what the hexes should like
   renderHex({context,layout,hex, labelProps:labelVisuals, ...hexVisuals});
 }

export default HexView
