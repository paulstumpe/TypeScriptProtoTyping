import {HydratedHex, HydratedHexWithUnit} from "./hexSlice";

export  const isHexWithUnit = (hex:HydratedHexWithUnit | HydratedHex):hex is HydratedHexWithUnit =>{
  return !!hex.unit
}

export const assertHexHasUnit = (hex:HydratedHex)=>{
  if(!hex.unit){
    throw new Error('asserted hex had unit, but it did not')
  }
}


