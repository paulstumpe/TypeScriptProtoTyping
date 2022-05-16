import HexagonBoard from "./hexagonBoard/HexagonBoard";
import {boardSettings} from "./hexagonBoard/hexagonBoardTypes";

type props = {
boardSettings : boardSettings
}

function Board({boardSettings}:props) {

    return (
        <div>
            <HexagonBoard boardSettings={boardSettings} />
        </div>

    );
}

export default Board;
