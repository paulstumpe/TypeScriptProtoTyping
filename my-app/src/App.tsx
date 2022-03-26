import React, {useEffect} from 'react';
import axios from "axios";

function App() {
    useEffect(()=>{
        axios.get('hello')
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    },[])
  return (
        <div>
          {34*10}
        </div>

  );
}

export default App;
