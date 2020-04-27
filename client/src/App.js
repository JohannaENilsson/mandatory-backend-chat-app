import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import io from 'socket.io-client';
import './App.css';

import Login from './components/Login';
import ChatView from './components/ChatView';


function App() {
  const [socket, setSocket] = useState(io('localhost:8000'));
  const [userName, handleUserName] = useState('null');
  console.log(userName);

  useEffect(() => {
    axios('/users').then((data) => {
      console.log(data);
    });
    console.log(socket);

    // Lyssnar på meddelande från servern
    socket.on('message', (data) => {
      console.log(data);
    });
  }, []);

  if(userName){
    socket.emit('user', userName);
    // setInterval(()=> {
    //   axios('/users').then((data) => {
    //     console.log(data);
    //   });

    // }, 1000);
    }

  return (
    <>
      <Helmet>
        {!userName ? <title>Login</title> : <title>Chat</title>  }
      </Helmet>
      <main >
      {/* className='App' */}
        {!userName ? <Login handleUserName={handleUserName}/> : <ChatView />}
        

      </main>
    </>
  );
}

export default App;
