import React, {useEffect, useState} from 'react';
import axios from "axios";
import BottomBar from "./Views/BelowBoard/BottomBar";
import TopBar from "./Views/AboveBoard/TopBar";
import HexagonBoard from "./Views/hexagonBoard/HexagonBoard";

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


