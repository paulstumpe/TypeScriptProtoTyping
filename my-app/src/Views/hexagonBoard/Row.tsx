import {rowProps} from "./hexagonBoardTypes";
import hexCss from "./hexCss";
import isOdd from "../../utilities/isOdd";
import Hex from "./Hex";

export default function Row ({column, row, boardSettings}:rowProps){
  const {hexColor, pxUnit, vertical} = boardSettings;
  let hexStyles = hexCss(hexColor, pxUnit, vertical)
  return (

    <div className={'row'} style={isOdd(row)? hexStyles.hexRowEven: hexStyles.hexRowOdd}>
      {column.map((hex,column)=>(
          <Hex hex={hex} column={column} row={row} boardSettings={boardSettings} />
        )
      )}
    </div>
  )
}
