import axios from "axios";
import EndTurnButton from "./EndTurnButton";
import endTurn from "../Game Entities/endTurn";
type props = {

}

function BottomBar({}:props) {

    return (
        <div>
            <EndTurnButton endTurn={endTurn}/>
        </div>

    );
}

export default BottomBar;
