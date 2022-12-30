import {useAppDispatch } from "../../reduxCustomHooks";
import {HydratedHex, selectHex, setUnit} from "../../store/slices/hexSlice";
import {addUnit, selectUnit} from "../../store/slices/unitsSlice";
import HexInfo from "./HexInfo";

type props = {
  hex:HydratedHex
}



function SelectedHex({hex}:props) {
  let dispatch = useAppDispatch();
  const addUnitToSelected = ()=>{
    let dispatchedUnit = dispatch(addUnit('charname'))
    dispatch(setUnit({
        unit: dispatchedUnit.payload,
        hex: hex
    }))
  }

  return (
    <div>
        <div>
            <div>hex</div>
            <div>selected hex:</div>
            <ul>
              <li>Q: {hex.q}</li>
              <li>R: {hex.r}</li>
              <li>S: {hex.s}</li>
            </ul>
        </div>
      {hex && hex.terrain &&
          <div>
              terrain: {hex.terrain}
          </div>
      }
      {hex && hex.unit &&
          <HexInfo unit={hex.unit}></HexInfo>
      }
      <div>
        <div>add unit to hex</div>
        <button onClick={addUnitToSelected} > add</button>
      </div>
    </div>
  );
}

export default SelectedHex;