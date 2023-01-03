import {useAppDispatch } from "../../store/reduxCustomHooks";
import {HydratedHex, selectHex, setTerrain, setUnit, Terrains, terrains} from "../../store/slices/hexSlice";
import {addUnit} from "../../store/slices/unitsSlice";
import HexInfo from "./HexInfo";
import {blueBox} from "./UnitViewThing";


type props = {
  hex:HydratedHex
}


function SelectedHex({hex}:props) {
  let dispatch = useAppDispatch();
  const addUnitToSelected = ()=>{
    let dispatchedUnit = dispatch(addUnit('unit'))
    dispatch(setUnit({
        unit: dispatchedUnit.payload,
        hex
    }))
  }
  const handleSetTerrain = (terrain:Terrains)=>{
    dispatch(setTerrain({
      hex,
      terrain
    }))
  }

  return (
    <div>
      {hex && !hex.unit &&
          <div style={blueBox} >
              <div>hex</div>
              <div>selected hex:</div>
              <ul>
                  <li>Q: {hex.q}</li>
                  <li>R: {hex.r}</li>
                  <li>S: {hex.s}</li>
              </ul>
          </div>
      }

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
          <div>
            {terrains.map(terrain=>(
              <>
                <div><button onClick={()=>{handleSetTerrain(terrain)}}>{terrain}</button></div>
              </>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedHex;
