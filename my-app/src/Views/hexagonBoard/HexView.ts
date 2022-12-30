import LayoutClass, {LayoutStruct} from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexLabel, {HexLabelProps, PartialLabelProps} from "./HexLabel";
import {HydratedHex, selectHex} from "../../store/slices/hexSlice";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import {store} from "../../store/store";
import {getSelectedHex} from "../../store/slices/uiSlice";
import renderHex from "./renderHex";


 const HexView = (
  context:CanvasRenderingContext2D,
  layout:LayoutStruct,
  hex: HexStruct,
)=>{
   let state = store.getState()
   let hexState = selectHex(state, hex)
   let selectedHex = getSelectedHex(state);
   let labelVisuals = {}
   let hexVisuals = {}
   //todo create all the conditional logic i want that will decide what the hexes should like
   renderHex({context,layout,hex});
 }

export default HexView
