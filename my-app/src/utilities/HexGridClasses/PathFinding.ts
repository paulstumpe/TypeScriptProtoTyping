// https://www.redblobgames.com/pathfinding/a-star/introduction.html
// todo


import {HexStruct} from "./Structs/Hex";
import HexUtility from "./HexClass";
import {HexesWithState} from "../../Views/hexagonBoard/createsHexesForRender";
import {HydratedUnit} from "../../store/slices/unitsSlice";
import LayoutClass from "./LayoutClass";
import {Terrain, terrainsDict} from "../../ProtoType Mechanics/fe7 stats/terrain and movement";
import {basesDict, baseUnits} from "../../ProtoType Mechanics/unitClasses/soldier";

type FloodSearchCB = (a: HexStruct) => {
  hexLandable:boolean,
  hexPassable:boolean,
  costToMoveInto:number,
}

export default class PathFinding {
  /**
   *
   * @param start
   * @param movement
   * @param hexDictionary
   * @param allowed callback that takes a stateful hex from the dictionary, and should return true if that hex is an allowed space
   */
  public static floodSearch(start:HexStruct, movement:number, allowed:FloodSearchCB){


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

    //these hexes can go into frontier, but can never go into reached, as we are not allowed to land in them
    //todo should we put starting hex in not landable?
    let notLandable:HexStruct[] = [];


    frontier.push(start);
    //for each hex you can move
    for(let i=0; i<movement;i++){
      //this will become frontier, after I finish searching all of my movement on this move
      let nextFrontier:HexStruct[] = [];

      //proccesses the previous frontier to decide if any needed to be added to eached
      frontier.forEach(frontierHex=>{
        let hexInReached = HexUtility.hexIsInArray(frontierHex,reached)
        //hex is not in "not landable array" so we are allowed to land in it"
        let hexNotLandable = HexUtility.hexIsInArray(frontierHex, notLandable);
        if(!hexInReached && !hexNotLandable){
          //we haven't reached, and we're not forbidden
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
              //allowed was simplyseeing if we could occupy, need to do more and handle in more ways now
              let {hexLandable, hexPassable, costToMoveInto} = allowed(neighbor);
              if(costToMoveInto>1){
                //todo need to figure out how to handle this type of situation
              }
              // if(!hexPassable && !hexLandable){
              //   //do nothing, it cant be in frontier
              // }
              // if(!hexLandable && hexPassable) {
              //   //hex cant be landed on but can be passed through
              //   //add to own array type of passable but not landable?
              //   notLandable.push(neighbor);
              // }
              if(hexLandable && hexPassable){
                nextFrontier.push(neighbor)
              } else if (hexLandable){
                //its landable but not passable? weird, should note this
                throw new Error('landable but not passable????')
              } else if (hexPassable){
                //not landable but we can pass through, add to frontier and to not landable arrays
                nextFrontier.push(neighbor);
                notLandable.push(neighbor);
              } else if(!hexLandable && !hexPassable){
                //should not be add to frontier, as we cant traverse  it.
              } else {
                throw new Error('reached siutation not accounted for');
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

    //todo right now this doesnt have a way to account for hexes you can move through but not end on
    //it also doesn't have a way to account for hexes you can move into, but whose cost is higher than 1 move
    // terrain:Terrain,OccupyingUnits:HydratedUnit, MovingUnit:HydratedUnit will probably want these later
    let allowedMove = (hex:HexStruct)=>{

      const payload = {
        hexLandable : true,
        hexPassable : true,
        costToMoveInto :1,
      };

      let hydratedHex = allHexes[HexUtility.hexIdFromHex(hex)];
      //this accounts for hexes that aren't within the bounds of the board
      if(!hydratedHex){
        payload.hexLandable = false;
        payload.hexPassable = false;
        payload.costToMoveInto = 1;
        return payload;
      }


      //this accounts for hexes already occupied by someone else
      if(hydratedHex.unit){
        payload.hexLandable = false;
        //if allied unit we should be able to pass through otherwise impassable
        payload.hexPassable = hydratedHex.unit.player === unit.player
      }

      if(hydratedHex.terrain){
        let base =basesDict[unit.unitToInherit];
        let baseMovementType = base.movementType;
        let terrain = terrainsDict[hydratedHex.terrain];
        let costIfInTable = terrain.movement[baseMovementType];
        if(costIfInTable!==undefined){
          payload.costToMoveInto = costIfInTable;
        }
        payload.costToMoveInto = terrain.movement.defaultMoveCost;
      }

      return payload;
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
