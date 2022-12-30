import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import LayoutClass, {makePoint, OrientationStruct, PointStruct} from "../../utilities/HexGridClasses/LayoutClass";

interface LayoutState {
  orientation: "pointy" | "flat",
  sizeX : number,
  sizeY : number,
  originX : number,
  originY : number,
}

const initialState: LayoutState = {
  orientation: 'pointy',
  sizeX : 35,
  sizeY : 35,
  originX : 0,
  originY : 0,
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers:{
    setOrientation : (state, action:PayloadAction<{isPointy:boolean}>)=>{
      const {isPointy} = action.payload
      state.orientation = isPointy ? "pointy" : "flat"
    },
    setsize : (state, action:PayloadAction<{point:PointStruct}>)=>{
      const {point} = action.payload
      state.sizeX = point.x;
      state.sizeY = point.y;
    },
    setOrigin : (state, action:PayloadAction<{point:PointStruct}>)=>{
      const {point} = action.payload
      state.originX = point.x;
      state.originY = point.y;
    },
  }
})

export const {setsize, setOrigin, setOrientation} = layoutSlice.actions;

export const selectLayout = (state:RootState)=>{
  const {orientation, sizeX, sizeY, originX, originY} = state.layout
  let size = makePoint(sizeX,sizeY)
  let center = makePoint(originX,originY)
  let orientationStruct = orientation ==='pointy' ?  LayoutClass.pointy : LayoutClass.flat;
  return LayoutClass.newLayout(orientationStruct, size, center);
};

export default layoutSlice.reducer;

