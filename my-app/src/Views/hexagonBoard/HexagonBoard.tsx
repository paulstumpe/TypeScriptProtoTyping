import {useState} from "react";
import Rows from "./Rows";
import {boardSettings} from "./hexagonBoardTypes";




type props = {
    boardSettings: boardSettings
}

function HexagonBoard({boardSettings}:props) {
    return (
        <div>
            <Rows boardSettings={boardSettings} />
        </div>

    );
}



export default HexagonBoard;
