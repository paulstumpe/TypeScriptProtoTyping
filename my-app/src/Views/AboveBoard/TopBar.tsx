import {ReactEventHandler, useState, ChangeEvent} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reduxCustomHooks";
import {
  selectHorizontalHexes,
  selectVerticalHexes,
  setHorizontalHexes,
  setVerticalHexes
} from "../../store/slices/hexSlice";
import {selectLayout, setsize} from "../../store/slices/layoutSlice";
import {makePoint} from "../../utilities/HexGridClasses/LayoutClass";


function TopBar() {
  // read layout useAppSelector()
  // set layout useAppDispatch()
  const verticalHexes = useAppSelector(selectVerticalHexes);
  const horizontalHexes = useAppSelector(selectHorizontalHexes);
  const layOut = useAppSelector(selectLayout);
  // const orientation = layOut.orientation;
  const dispatch =   useAppDispatch();
  const width = layOut.size.x
  const height = layOut.size.y
  // const handleToggleIsPointy = ()=>{
  //
  // }
  const handleSetHeight = (e:ChangeEvent<HTMLInputElement>)=>{
    let val = e.target.value;
    let point = makePoint(width, parseInt(val));
    dispatch(setsize({point}))
  }
  const handleSetWidth = (e:ChangeEvent<HTMLInputElement>)=>{
    let val = e.target.value;
    let point = makePoint(parseInt(val),height);
    dispatch(setsize({point}))
  }
  const handleSetVerticalHexes = (e:ChangeEvent<HTMLInputElement>)=>{
    let val = parseInt(e.target.value);
    dispatch(setVerticalHexes({vertical:val}));
  }
  const handleSetHorizontalHexes = (e:ChangeEvent<HTMLInputElement>)=>{
    let val = parseInt(e.target.value);
    dispatch(setHorizontalHexes({horizontal:val}))
  }

  return (
        <div >
          {/*<button onClick={handleToggleIsPointy}>{orientation}</button><br/>*/}
          <label>height:</label>
          <input type={'number'} value={height} onChange={handleSetHeight} /><br/>
          <label>width:</label>
          <input type={'number'} value={width} onChange={handleSetWidth} /><br/>
          <label>verticalHexes:</label>
          <input type={'number'} value={verticalHexes} onChange={handleSetVerticalHexes} /><br/>
          <label>horizontalHexes:</label>
          <input type={'number'} value={horizontalHexes} onChange={handleSetHorizontalHexes} /><br/>
          <div style={{height:'20px'}} />
          <div style={{height:'20px'}} />
        </div>

    );
}






export default TopBar;
