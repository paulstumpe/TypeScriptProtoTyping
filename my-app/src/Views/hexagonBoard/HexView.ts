import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexLabel, {HexLabelProps, PartialLabelProps} from "./HexLabel";
import {HydratedHex, selectHex} from "../../store/slices/hexSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {store} from "../../store/store";
import {getSelectedHex} from "../../store/slices/uiSlice";
import renderHex, {partialHexProps} from "./renderHex";


 const HexView = (
  context:CanvasRenderingContext2D,
  layout:LayoutStruct,
  hex: HexStruct,
)=>{
   let state = store.getState()
   let hexState = selectHex(state, hex)
   let selectedHex = getSelectedHex(state);
   let labelVisuals:PartialLabelProps = {}
   let hexVisuals:partialHexProps = {}

   let isSelected = selectedHex && HexUtility.equalTo(selectedHex,hexState)
   let terrain = hexState.terrain;
   let unit = hexState.unit

   //set unit name to label
    labelVisuals.text = unit?.name;

   //set color of font and tile based on terrain
   switch (terrain) {
     case "grass" :
       labelVisuals.fillStyle="white";
       hexVisuals.fillStyle="green";
       break;
   }

   //set outline based on occupied and selected
   if(unit){
     hexVisuals.strokeStyle = 'red'
   }
   if(isSelected){
     hexVisuals.strokeStyle = 'blue'
   }
   // hexVisuals.fillStyle


   //todo create all the conditional logic i want that will decide what the hexes should like
   renderHex({context,layout,hex, labelProps:labelVisuals, ...hexVisuals});
 }

export default HexView
