import {useAppSelector} from "../../store/reduxCustomHooks";
import {selectCombatLogs} from "../../store/slices/combatLogSlice";

type props = {

}

function CombatLog({}:props) {
  // let combatLogArr = useAppSelector(selectCombatLogs);
  return (
    <div>
      {/*{combatLogArr.map(logEntry=>(*/}
      {/*  <div>*/}
      {/*    attack result: {logEntry}*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>

  );
}

export default CombatLog;
