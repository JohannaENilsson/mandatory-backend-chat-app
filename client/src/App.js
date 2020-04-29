import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import io from 'socket.io-client';
import './App.css';

import Login from './components/Login';
import ChatView from './components/ChatView';
import Logout from './components/Logout';


function App() {
  const [socket, setSocket] = useState(io('localhost:8000'));
  const [userName, handleUserName] = useState(null);
  // console.log(userName);

  useEffect(() => {


    // Lyssnar på meddelande från servern
    socket.on('message', (data) => {
      console.log('Got this from SERVER ', data);
    });
  }, []);


  return (
    <>
      <Helmet>
        {!userName ? <title>Login</title> : <title>Chat</title>  }
      </Helmet>
      <main className='App'>
        {userName && <Logout handleUserName={handleUserName}/>}
        {!userName ? <Login handleUserName={handleUserName}/> : <ChatView from={userName}/>}
        
        

      </main>
    </>
  );
}

export default App;
