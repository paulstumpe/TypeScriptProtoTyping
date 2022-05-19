import React, {useEffect, useState} from 'react';
import axios from "axios";
import BottomBar from "./Views/BelowBoard/BottomBar";
import TopBar from "./Views/AboveBoard/TopBar";
import Board from "./Views/Board";



let defaultBoardSettings = {
  hexColor : `#6C6`,
  pxUnit : 60,
  vertical : false,
  rowCount : 4,
  columnCount : 4,
}

function App() {

  useEffect(()=>{
        axios.get('hello')
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    },[])
  return (
        <div>
            <TopBar/>
            <Board />
            <BottomBar/>
        </div>

  );
}

export default App;


