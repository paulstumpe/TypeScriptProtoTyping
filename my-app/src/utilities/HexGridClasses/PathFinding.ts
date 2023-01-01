// https://www.redblobgames.com/pathfinding/a-star/introduction.html
// todo


import {HexStruct} from "./Structs/Hex";
import HexUtility from "./HexClass";
import {HexDictionary, HydratedHex} from "../../store/slices/hexSlice";

export default class PathFinding {
  /**
   *
   * @param start
   * @param movement
   * @param hexDictionary
   * @param allowed callback that takes a stateful hex from the dictionary, and should return true if that hex is an allowed space
   */
  public static floodSearch(start:HexStruct, movement:number, hexDictionary?:HexDictionary, allowed?:(a: HydratedHex) => boolean){


//so we have visited
//and then we have frontier(frontier is all the hexes that are neighbors to visited
//that aren't among visited
//amount of loops is=to movement
// a loop is finished when the current batch of frontiers have been processed
    //the first hex is the one you occupy, so we need to add a freebie to account for it
    movement++
    let frontier = [];
    let reached:HexStruct[] = [];
    frontier.push(start);
    for(let i=0; i<movement;i++){
      let nextFrontier:HexStruct[] = [];

      //add hexes from current frontier to reached
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
              if(hexDictionary && allowed){
                let hydratedHex = hexDictionary[HexUtility.hexIdFromHex(neighbor)];
                if (hydratedHex){
                  let isAllowed = allowed(hydratedHex);
                  if (isAllowed){
                    nextFrontier.push(neighbor)
                  }
                } else {
                  nextFrontier.push(neighbor)
                }
              } else {
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
}
