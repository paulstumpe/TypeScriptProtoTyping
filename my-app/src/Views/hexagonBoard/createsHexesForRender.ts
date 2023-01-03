import {HydratedUnit} from "../../store/slices/unitsSlice";
import {HydratedHex, Terrains} from "../../store/slices/hexSlice";
import LayoutClass from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";

export interface HexesForRender {
  selected:boolean
  moused:boolean
  movable:boolean
  frontier: boolean
  q:number,
  r:number,
  s:number,
  unit?:HydratedUnit,
  terrain?: Terrains,
}

interface CreateHexesForRenderProps {
  verticalHexes:number,
  horizontalHexes:number,
  hexesWithState: HexesWithState,
  selectedHex?:HydratedHex,
  mousedHex?:HydratedHex,
  movableArr:  HexStruct[],
  attackRngHexes: HexStruct[],
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
    mousedHex,
    movableArr,
    attackRngHexes
  } = props;

  // const selectedUI = ui.selectedHex;
  const statelessHexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);
  const hexesForRender:HexesForRender[] = statelessHexes.map((hex)=>{
    return createHexForRender(hex,hexesWithState,selectedHex, mousedHex, movableArr, attackRngHexes)
  })
  return hexesForRender;
}

const createHexForRender = (hex:HexStruct,hexesWithState:HexesWithState,selectedHex:HydratedHex|undefined, mousedHex:HydratedHex|undefined, movableArr:HexStruct[], attackRngHexes:HexStruct[]):HexesForRender=>{
  let stateHex = hexesWithState[HexUtility.hexIdFromHex(hex)];
  let unit = stateHex?.unit;
  let terrain = stateHex?.terrain;
  let selected = stateHex?.selected || HexUtility.isEqualWithUndefined(hex, selectedHex);
  let moused = stateHex?.moused || HexUtility.isEqualWithUndefined(hex, mousedHex);
  // let moused = stateHex?.moused || isSelected(hex, selectedHex);
  let movable = HexUtility.hexIsInArray(hex,movableArr)
  let frontier = HexUtility.hexIsInArray(hex,attackRngHexes)
  //todo

  return {
    ...hex,
    unit,
    terrain,
    selected,
    movable,
    moused,
    frontier
  }
}



export default createHexesForRender;
