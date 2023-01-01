import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";

type props = {
  hex:HexStruct
}

function HexCordList({hex}:props) {
const {q,r,s} = hex;
  return (
    <ul>
      <li>{q}</li>
      <li>{r}</li>
      <li>{s}</li>
    </ul>

  );
}

export default HexCordList;
