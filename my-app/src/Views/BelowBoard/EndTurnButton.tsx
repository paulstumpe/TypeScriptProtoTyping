import {enemyTurn} from "../../ProtoType Mechanics/Aritifical Intelligence/simplestAi";
import {useDispatch} from "react-redux";
import {endTurn} from "../../store/slices/gameSlice";
import {useAppDispatch} from "../../store/reduxCustomHooks";


function EndTurnButton() {
  const dispatch = useAppDispatch();





  const handleEndTurn = ()=>{
    enemyTurn();
  }
  const commenceToNextTurnWithoutEnemyTakingTurn = ()=>{
    dispatch(endTurn());
  }

  return (
        <div>
          <button onClick={handleEndTurn}>End player Turn and commit enemy turn</button>
          <button onClick={commenceToNextTurnWithoutEnemyTakingTurn}>End turn without enemy doing anything</button>
        </div>

  );
}

export default EndTurnButton;
