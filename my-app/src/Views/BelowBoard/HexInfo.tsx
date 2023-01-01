import {HydratedUnit} from "../../store/slices/unitsSlice";
import UnitViewThing from "./UnitViewThing";


type props = {
  unit:HydratedUnit
}

function HexInfo({unit}:props) {
  return(
    <>
      {unit &&
          <UnitViewThing unitID={unit.id} highlight={true} />
      }
    </>
)
}

export default HexInfo;
