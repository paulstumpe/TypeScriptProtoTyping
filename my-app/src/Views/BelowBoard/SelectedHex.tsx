import {useAppDispatch } from "../../store/reduxCustomHooks";
import {HydratedHex, selectHex, setTerrain, setUnit} from "../../store/slices/hexSlice";
import {addUnit} from "../../store/slices/unitsSlice";
import HexInfo from "./HexInfo";

type props = {
  hex:HydratedHex
}

const terrains:string[] = ['grass',]

function SelectedHex({hex}:props) {
  let dispatch = useAppDispatch();
  const addUnitToSelected = ()=>{
    let dispatchedUnit = dispatch(addUnit('unit'))
    dispatch(setUnit({
        unit: dispatchedUnit.payload,
        hex
    }))
  }
  const handleSetTerrain = (terrain:string)=>{
    dispatch(setTerrain({
      hex,
      terrain
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
      <div>
        <div>
          set terrain:
          <ul>
            {terrains.map(terrain=>(
              <>
                <li><button onClick={()=>{handleSetTerrain(terrain)}}>{terrain}</button></li>
              </>))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelectedHex;
