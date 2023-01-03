// https://www.redblobgames.com/pathfinding/a-star/introduction.html
// todo


import {HexStruct} from "./Structs/Hex";
import HexUtility from "./HexClass";
import {HexDictionary, HydratedHex, Terrains} from "../../store/slices/hexSlice";
import {HexesWithState} from "../../Views/hexagonBoard/createsHexesForRender";
import {HydratedUnit} from "../../store/slices/unitsSlice";
import LayoutClass from "./LayoutClass";

export default class PathFinding {
  /**
   *
   * @param start
   * @param movement
   * @param hexDictionary
   * @param allowed callback that takes a stateful hex from the dictionary, and should return true if that hex is an allowed space
   */
  public static floodSearch(start:HexStruct, movement:number, allowed:(a: HexStruct) => boolean){


//so we have visited
//and then we have frontier(frontier is all the hexes that are neighbors to visited
//that aren't among visited
//amount of loops is=to movement
// a loop is finished when the current batch of frontiers have been processed
    //the first hex is the one you occupy, so we need to add a freebie to account for it
    movement++

    //hexes I'm touching and can possibly move to next
    let frontier = [];
    //hexes I've already reached
    let reached:HexStruct[] = [];
    frontier.push(start);
    //for each hex you can move
    for(let i=0; i<movement;i++){
      //this will become frontier, after I finish searching all of my movement on this move
      let nextFrontier:HexStruct[] = [];

      //proccesses the previous frontier to decide if any needed to be added to eached
      frontier.forEach(frontierHex=>{
        let hexInReached = HexUtility.hexIsInArray(frontierHex,reached)
        if(!hexInReached){
          reached.push(frontierHex);
        }
      })

      //determine the next frontier.
      frontier.forEach((frontierHex)=>{
        //get all the neighbors of the hex
        let neighbors = HexUtility.allNeighbors(frontierHex);

        //loop neighbors of currenthex to see if they can be added to frontier
        neighbors.forEach(neighbor=>{
          //see if hex is reached
          let hexNotReached = !HexUtility.hexIsInArray(neighbor,reached);
          //haven't been reached yet, they can be added to the next frontier
          if(hexNotReached){

           //make sure next frontier doesn't already include them

            let notInNextFrontier = !HexUtility.hexIsInArray(neighbor,nextFrontier)
            if(notInNextFrontier){
              //make sure the hex is allowed based on provided filter
              if(allowed(neighbor)){
                nextFrontier.push(neighbor)
              }
            }
          }
        })
      })
      //set the next batch of frontiers
      frontier=nextFrontier;
    }
    return reached;
  }


  public static getMovable = (unit:HydratedUnit, selectedHex:HexStruct, hexesWithState:HexesWithState, horizontal:number, vertical:number)=>{
    //if a hex is selected, and that hex contains a unit, calculate that units
    //movable hexes and return
    //creates an array of x's within n range of selected hex
    let allHexes = {
      ...hexesWithState
    }
    const statelessHexes = LayoutClass.shapeRectangleArbitrary(vertical, horizontal);
    statelessHexes.forEach(hex=>{
      let hexId = HexUtility.hexIdFromHex(hex)
      if(!allHexes[hexId]){
        allHexes[hexId] = {
          ...hex,
          selected: false,
          moused: false,
        }
      }
    })

    let allowedMove = (hex:HexStruct)=>{
      let hydratedHex = allHexes[HexUtility.hexIdFromHex(hex)];
      if(!hydratedHex){
        return false;
      }
      if (hydratedHex.unit){
        return false;
      }
      return true;
    }

    let movable:HexStruct[] = [];
    if(selectedHex) {
      let hexState = hexesWithState[HexUtility.hexIdFromHex(selectedHex)];
      if(hexState){
        if (hexState.unit){
          if(hexState.unit.movement){
            movable = PathFinding.floodSearch(selectedHex,hexState.unit.movement, allowedMove);
          }
        }
      }
    }
    return movable;
  }


  //todo update to actually use radius
  public static attackableFromHex = (hex:HexStruct, attackRange:number):HexStruct[]=>{
    return HexUtility.getRing(hex,attackRange);
  }

  //calculate move array first, then feed move array through this
  public static attackableFromArrayOfHexes = (hexes:HexStruct[], attackRange:number):HexStruct[]=>{
    //so this is basically, getting all movable hexes, and then running attack out from those hexes, and then making a unique array of those
    //and returning that?
    //my first idea is super inneficient...
    //todo make more efficient algorithm answer
    const attackable:HexStruct[] = []
    hexes.forEach(hexA=>{
      let attackableFromCurrentHex = PathFinding.attackableFromHex(hexA, attackRange);
      attackableFromCurrentHex.forEach(hexB=>{
        let inAttackable = HexUtility.hexIsInArray(hexB,attackable)
        if(!inAttackable){
          attackable.push(hexB);
        }
      })
    })
    return attackable
  }


}
