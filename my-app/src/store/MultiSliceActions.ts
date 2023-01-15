import {createAction} from "@reduxjs/toolkit"
import {Orientation} from "../utilities/HexGridClasses/HexClass";
// we are gonna dispatch this

interface Payload {
  attackerId:string,
  targetId:string,
  attackerDirection:Orientation,
  turnAttacked:number,
  attackerHp:number,
  targetHp:number,
  rngArr:number[],
}

//means slice is 'unit' and action is 'attack
export const attackAction = createAction<Payload>('unit/attack')
