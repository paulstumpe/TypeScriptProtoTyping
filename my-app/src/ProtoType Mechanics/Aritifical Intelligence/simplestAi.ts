import {store} from "../../store/store";
import {
  HydratedUnit,
  selectAllAttackableHexesWithUnits,
  selectAllUnitsBelongingToPlayerId, selectHexesAttackableAfterMove, selectMovable
} from "../../store/slices/unitsSlice";
import {selectAllPlayers, selectPlayersWithUnfinishedTurn, selectPrimaryPlayer} from "../../store/slices/playersSlice";
import {HydratedHexWithUnit, moveUnit, selectHex, selectHexWithUnit} from "../../store/slices/hexSlice";
import HexUtility, {Orientation} from "../../utilities/HexGridClasses/HexClass";
import {endTurn, selectTurn} from "../../store/slices/gameSlice";
import {attackAction} from "../../store/MultiSliceActions";
import {FullAttackStrikes} from "../combatSystems/fe7Calculator";
import {generateAttackResults} from "../validateAttack";
import {assertHexHasUnit, isHexWithUnit} from "../../store/slices/unitSliceTypePredicateFunctions";
import {HexStruct} from "../../utilities/HexGridClasses/Structs/Hex";








//should be called when player ends turn
export const enemyTurn = ()=>{
  // const unfinshedPlayers = selectPlayersWithUnfinishedTurn(state)
  const state = store.getState()
  const allPlayers = selectAllPlayers(state);
  let enemy = allPlayers.find(player=>player.name==='enemy');
  if(!enemy){
    return;
  }
  const enemyUnits = selectAllUnitsBelongingToPlayerId(state,enemy.id);
  enemyUnits.forEach(unit=>enemyUnitTurn(unit))
  store.dispatch(endTurn());

  //todo dispatch end turn;
}
//get array of all enemey units
//loop array and call enemyUnitTurn on each
//set current turn ++



//enemyUnitTurn
const enemyUnitTurn = (unit:HydratedUnit)=>{
  //if a unit has gone this turn, they shouldn't be allowed to go again
  let state = store.getState()
  const currentTurn = selectTurn(state);
  if(unit.turnAttacked === currentTurn || unit.turnMoved===currentTurn){
    //todo seperate out more actions than just a single run at and attack idea.
    return;
  }
  // let unitHex = selectHexWithUnit(state,unit.id)
  let attackableHexes = selectHexesAttackableAfterMove(state,unit);
  let primaryPlayer = selectPrimaryPlayer(state);
  let targets = selectAllUnitsBelongingToPlayerId(state,primaryPlayer.id)
  let targetHexes = targets.map(target=>selectHexWithUnit(state,target.id)).filter((targetHex):targetHex is HexStruct=>targetHex!==undefined);
  let targetHexesAttackable = targetHexes.filter(targetHex=>HexUtility.hexIsInArray(targetHex,attackableHexes));
  if(!targetHexesAttackable.length){
    return;
  }

  const firstAttackableHexUnhydrated = targetHexesAttackable[0];
  const firstAttackAbleHex = selectHex(state,firstAttackableHexUnhydrated)
  if(!isHexWithUnit(firstAttackAbleHex)){
    throw new TypeError();
  }
  const targetHex:HydratedHexWithUnit = firstAttackAbleHex;
  //this means I can commit an attack
  const attacker = unit;
  const target = targetHex.unit;
  let movableHexes = selectMovable(state,attacker);

  //todo make this work with ranges
  let neighborsOfAttackable = HexUtility.allNeighbors(targetHex);
  let canMoveToForAttack = neighborsOfAttackable.find(neighbor=> {
    let matchHex=movableHexes.find(movable=>HexUtility.equalTo(neighbor,movable))
    if(matchHex){
      return true;
    }
    return false;
  })
  if(!canMoveToForAttack){
    throw new Error('couldnt find a way to attack hex even though i reported it was attackable')
  }

  //dispatch move to canmoveto
  store.dispatch(moveUnit({hex:canMoveToForAttack,unit}))
  store.getState()

  const attackerHex = selectHex(state,canMoveToForAttack)
  const {attackerDirection,
    turnAttacked,
    fullAttackResults,
    rngArr,
  }  = generateAttackResults({attacker , target, currentTurn, targetHex, attackerHex});
  store.dispatch(attackAction({
    attackerId:attacker.id,
    targetId:targetHex.unit.id,
    fullAttackResults,
    attackerDirection,
    turnAttacked,
    rngArr,
  }));
}

export const attack = ()=>{

}




export default {}
