import {createAction} from "@reduxjs/toolkit"
import {Orientation} from "../utilities/HexGridClasses/HexClass";
import {FullAttackPayload, FullAttackStrikes} from "../ProtoType Mechanics/combatSystems/fe7Calculator";
// we are gonna dispatch this

interface Payload {
  attackerId:string,
  targetId:string,
  attackerDirection:Orientation,
  turnAttacked:number,
  fullAttackResults:FullAttackPayload,
  rngArr:number[],
}

//means slice is 'unit' and action is 'attack
export const attackAction = createAction<Payload>('unit/attack')
