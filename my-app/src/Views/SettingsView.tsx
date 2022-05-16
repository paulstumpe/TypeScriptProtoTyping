import {SetBoardSettings} from "../App";
import {boardSettings} from "./hexagonBoard/hexagonBoardTypes";

type props = {
  boardSettings: boardSettings,
  setBoardSettings: SetBoardSettings,
}

export default function SettingsView ({boardSettings, setBoardSettings}:props){
  const {hexColor, pxUnit, columnCount, rowCount, vertical} = boardSettings
  return (
    <div>
      <ul>
        <li>hexColor: {hexColor}</li>
        <li>pxUnit: {pxUnit}</li>
        <li>columnCount: {columnCount}</li>
        <li>rowCount: {rowCount}</li>
        <li>vertical: {vertical}</li>
      </ul>
    </div>
  )
}
