import {ChangeEventHandler, ReactEventHandler, SyntheticEvent, useState, MouseEvent, RefObject} from "react";

function TopBar() {

  const [isPointy, setIsPointy] = useState(true);
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(25);
  const [verticalHexes, setVH] = useState(15);
  const [horizontalHexes, setHH] = useState(15);

  return (
        <div >
          <button onClick={e=>setIsPointy(pre=>!pre)}>{!isPointy?"Pointy":"Flat"}</button><br/>
          <label>height:</label>
          <input type={'number'} value={height} onChange={e => setHeight(+e.target.value) } /><br/>
          <label>width:</label>
          <input type={'number'} value={width} onChange={e => setWidth(+e.target.value) } /><br/>
          <label>verticalHexes:</label>
          <input type={'number'} value={verticalHexes} onChange={e => setVH(+e.target.value) } /><br/>
          <label>horizontalHexes:</label>
          <input type={'number'} value={horizontalHexes} onChange={e => setHH(+e.target.value) } /><br/>
          <div style={{height:'20px'}} />
          <div style={{height:'20px'}} />
        </div>

    );
}






export default TopBar;
