import React, {useEffect} from 'react';
import axios from 'axios';

import io from 'socket.io-client';
import './App.css';

function App() {
  let socket = io('localhost:8000');
  

  useEffect(() => {

    axios('/users')
    .then(data => {
      console.log(data);
    })
    console.log(socket);
    
    socket.on('message', (data) => {
      console.log(data);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
