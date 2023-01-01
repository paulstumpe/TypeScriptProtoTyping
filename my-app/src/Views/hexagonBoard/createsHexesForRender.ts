import {HydratedUnit} from "../../store/slices/unitsSlice";
import {HydratedHex} from "../../store/slices/hexSlice";
import LayoutClass from "../../utilities/HexGridClasses/LayoutClass";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";
import HexUtility from "../../utilities/HexGridClasses/HexClass";
import PathFinding from "../../utilities/HexGridClasses/PathFinding";

export interface HexesForRender {
  selected:boolean
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
  hexesWithState: hexesWithState,
  selectedHex?:HydratedHex,
}

interface hexesWithState {
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
  } = props;

  // const selectedUI = ui.selectedHex;
  const statelessHexes = LayoutClass.shapeRectangleArbitrary(verticalHexes, horizontalHexes);
  const movableArr = getMovable(selectedHex,hexesWithState);

  const hexesForRender:HexesForRender[] = statelessHexes.map((hex)=>{
    return createHexForRender(hex,hexesWithState,selectedHex,movableArr)
  })
  return hexesForRender;
}

const createHexForRender = (hex:HexStruct,hexesWithState:hexesWithState,selectedHex:HydratedHex|undefined,movableArr:HexStruct[]):HexesForRender=>{
  let stateHex = hexesWithState[HexUtility.hexIdFromHex(hex)];
  let unit = stateHex?.unit;
  let terrain = stateHex?.terrain;
  let selected = stateHex?.selected || isSelected(hex, selectedHex);
  let movable = HexUtility.hexIsInArray(hex,movableArr)

  return {
    ...hex,
    unit,
    terrain,
    selected,
    movable,
  }
}

const getMovable = (selectedHex:HydratedHex|undefined, hexesWithState:hexesWithState)=>{
  //if a hex is selected, and that hex contains a unit, calculate that units
  //movable hexes and return
  //creates an array of x's within n range of selected hex
  let movable:HexStruct[] = [];
  if(selectedHex) {
    let hexState = hexesWithState[HexUtility.hexIdFromHex(selectedHex)];
    if(hexState){
      if (hexState.unit){
        if(hexState.unit.movement){
          movable = PathFinding.floodSearch(selectedHex,hexState.unit.movement);
        }
      }
    }
  }
  return movable;
}

const isSelected = (hex:HexStruct, selected?:HexStruct)=>{
  if(selected) {
    if (HexUtility.equalTo(hex,selected)){
      return true;
    }
  }
  return false;
}

export default createHexesForRender;
