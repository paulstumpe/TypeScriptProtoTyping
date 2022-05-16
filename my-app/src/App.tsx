import React, {useEffect, useState} from 'react';
import axios from "axios";
import BottomBar from "./Views/BottomBar";
import TopBar from "./Views/TopBar";
import Board from "./Views/Board";
import {boardSettings} from "./Views/hexagonBoard/hexagonBoardTypes";


let defaultBoardSettings = {
  hexColor : `#6C6`,
  pxUnit : 60,
  vertical : false,
  rowCount : 4,
  columnCount : 4,
}
export type SetBoardSettings = React.Dispatch<React.SetStateAction<boardSettings>>

function App() {
  let [boardSettings, setBoardSettings] = useState<boardSettings>(defaultBoardSettings)

  useEffect(()=>{
        axios.get('hello')
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    },[])
  return (
        <div>
            <TopBar/>
            <Board boardSettings={boardSettings} />
            <BottomBar boardSettings={boardSettings} setBoardSettings={setBoardSettings}/>
        </div>

  );
}

export default App;


