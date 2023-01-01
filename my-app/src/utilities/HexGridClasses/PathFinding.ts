// https://www.redblobgames.com/pathfinding/a-star/introduction.html
// todo


import {HexStruct} from "./Structs/Hex";
import HexUtility from "./HexClass";

export default class PathFinding {
  public static floodSearch(start:HexStruct, movement:number){


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
      //all of current frontier can be added to reached
      frontier.forEach(frontierHex=>{
        let hexInReached = HexUtility.hexIsInArray(frontierHex,reached)
        if(!hexInReached){
          reached.push(frontierHex);
        }
      })

      frontier.forEach((frontierHex)=>{
        //get all the neighbors of the hex
        let neighbors = HexUtility.allNeighbors(frontierHex);
        //for each neighbor that hasn't been reached yet, it should be
        //added to the new frontier;
        neighbors.forEach(neighbor=>{
          let hexInReached = HexUtility.hexIsInArray(neighbor,reached);
          //haven't been reached yet, they can be added to the next frontier
          if(!hexInReached){
           //make sure next frontier doesn't already include them
            let inNextFrontier = HexUtility.hexIsInArray(neighbor,nextFrontier)
            if(!inNextFrontier){
              nextFrontier.push(neighbor)
            }
          }
        })
      })
      //set the next batch of frontiers
      frontier=nextFrontier;
    }
    return reached;
  }


  //   let frontier = [];
  //   frontier.unshift(start);
  //   let reached:HexStruct[] = [];
  //   reached.push(start);
  //   let i=0;
  //   while (frontier.length > 0 && i<movement ){
  //     let current = frontier.pop();
  //     if(current){
  //       //get all the neighbors of current
  //       let neighbors = HexUtility.allNeighbors(current);
  //       neighbors.forEach((next:HexStruct)=>{
  //         //if next no in reached
  //         let nextIsNew = !reached.filter(hex=>HexUtility.equalTo(hex,next)).length
  //         if(nextIsNew){
  //           frontier.unshift(next);
  //           reached.push(next);
  //         }
  //       })
  //     }
  //     i++;
  //   };
  //   return reached;
  // }
}



// function hex_reachable(start, movement):
// var visited = set() # set of hexes
// add start to visited
// var fringes = [] # array of arrays of hexes
// fringes.append([start])
//
// for each 1 < k ≤ movement:
//   fringes.append([])
// for each hex in fringes[k-1]:
// for each 0 ≤ dir < 6:
// var neighbor = hex_neighbor(hex, dir)
// if neighbor not in visited and not blocked:
//   add neighbor to visited
// fringes[k].append(neighbor)
//
// return visited
