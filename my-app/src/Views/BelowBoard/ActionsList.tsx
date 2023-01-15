import {useAppSelector} from "../../store/reduxCustomHooks";
import {selectCombatLogs} from "../../store/slices/combatLogSlice";

type props = {

}

function ActionsList({}:props) {
  let combatLogArr = useAppSelector(selectCombatLogs);
  return (
    <div>
      <h2> List of Unit Actions</h2>
      {combatLogArr.map(logEntry=>(
        <div>
          attack result: {logEntry}
        </div>
      ))}
    </div>

  );
}

export default ActionsList;
