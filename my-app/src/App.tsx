import React, {useEffect} from 'react';
import axios from "axios";
import EndTurnButton from "./Views/EndTurnButton";
import endTurn from "./Game Entities/endTurn";

function App() {
    useEffect(()=>{
        axios.get('hello')
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    },[])
  return (
        <div>
            <EndTurnButton endTurn={endTurn} />
        </div>

  );
}

export default App;
