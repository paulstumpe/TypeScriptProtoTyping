import {rowsProps} from "./hexagonBoardTypes";
import rowGenerator from "../../utilities/rowGenerator";
import Row from "./Row";

export default function Rows ({boardSettings}:rowsProps){
  const { rowCount, columnCount } = boardSettings;
  let rows = rowGenerator(rowCount,columnCount);
  return (
    <>
      {rows.map((column, row)=>(
        <Row column={column} row={row} boardSettings={boardSettings}/>
      ))}
    </>

  );
}
