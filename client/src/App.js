import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';

import Login from './components/Login';
import ChatView from './components/ChatView';
import Logout from './components/Logout';
import Rooms from './components/Rooms';



function App() {
  const [socket, setSocket] = useState(null);
  const [userName, handleUserName] = useState(null);
  

  

  return (
    <>
      <Helmet>{!userName ? <title>Login</title> : <title>Chat</title>}</Helmet>
      <main className='App'>
        {userName && <Logout handleUserName={handleUserName} socket={socket}/>}
        {!userName ? (
          <>
          <Login handleUserName={handleUserName} setSocket={setSocket} />
          <Rooms />
          </>
        ) : (
          <ChatView from={userName} socket={socket} />
          
        )}
      </main>
    </>
  );
}

export default App;
