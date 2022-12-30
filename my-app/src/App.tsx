import React, {useEffect, useState} from 'react';
import axios from "axios";
import BottomBar from "./Views/BelowBoard/BottomBar";
import TopBar from "./Views/AboveBoard/TopBar";
import HexagonBoard from "./Views/hexagonBoard/HexagonBoard";



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
            <HexagonBoard />
            <BottomBar/>
        </div>

  );
}

export default App;


