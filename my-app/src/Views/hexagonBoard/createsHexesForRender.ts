import {HydratedUnit} from "../../store/slices/unitsSlice";
import {HydratedHex} from "../../store/slices/hexSlice";
import LayoutClass from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";

export interface HexesForRender {
  selected:boolean
  moused:boolean
  movable:boolean
  q:number,
  r:number,
  s:number,
  unit?:HydratedUnit,
  terrain?: string,
}

interface CreateHexesForRenderProps {
  verticalHexes:number,
  horizontalHexes:number,
  hexesWithState: HexesWithState,
  selectedHex?:HydratedHex,
  mousedHex?:HydratedHex,
}

export interface HexesWithState {
  //has string keys that all point to hexstates
  [key: string]: HydratedHex | undefined;
}

/**
 * combines hexstate with ui to create an array of hexes ready for rendering
 * @param props
 */
const createHexesForRender = (props:CreateHexesForRenderProps):HexesForRender[]=>{
  const {verticalHexes,
    horizontalHexes,
    hexesWithState,
    selectedHex,
    mousedHex
  } = props;

  // const selectedUI = ui.selectedHex;
  const statelessHexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);
  const movableArr = PathFinding.getMovable(selectedHex,hexesWithState);

  const hexesForRender:HexesForRender[] = statelessHexes.map((hex)=>{
    return createHexForRender(hex,hexesWithState,selectedHex, mousedHex, movableArr)
  })
  return hexesForRender;
}

const createHexForRender = (hex:HexStruct,hexesWithState:HexesWithState,selectedHex:HydratedHex|undefined, mousedHex:HydratedHex|undefined, movableArr:HexStruct[]):HexesForRender=>{
  let stateHex = hexesWithState[HexUtility.hexIdFromHex(hex)];
  let unit = stateHex?.unit;
  let terrain = stateHex?.terrain;
  let selected = stateHex?.selected || HexUtility.isEqualWithUndefined(hex, selectedHex);
  let moused = stateHex?.moused || HexUtility.isEqualWithUndefined(hex, mousedHex);
  // let moused = stateHex?.moused || isSelected(hex, selectedHex);
  let movable = HexUtility.hexIsInArray(hex,movableArr)

  return {
    ...hex,
    unit,
    terrain,
    selected,
    movable,
    moused,
  }
}



export default createHexesForRender;
