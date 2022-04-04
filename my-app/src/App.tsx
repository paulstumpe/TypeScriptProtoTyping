import React, {useEffect} from 'react';
import axios from "axios";
import BottomBar from "./Views/BottomBar";
import TopBar from "./Views/TopBar";
import Board from "./Views/Board";
function App() {
    useEffect(()=>{
        axios.get('hello')
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    },[])
  return (
        <div>
            <TopBar/>
            <Board/>
            <BottomBar/>
        </div>

  );
}

export default App;


