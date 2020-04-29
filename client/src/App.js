import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';

import Login from './components/Login';
import ChatView from './components/ChatView';
import Logout from './components/Logout';

function App() {
  const [socket, setSocket] = useState(null);
  const [userName, handleUserName] = useState(null);

  // if (socket) {
  //   // Lyssnar på meddelande från servern
  //     socket.on('message', (data) => {
  //     console.log('Got this from SERVER ', data);
  //   });
  // }

  return (
    <>
      <Helmet>{!userName ? <title>Login</title> : <title>Chat</title>}</Helmet>
      <main className='App'>
        {userName && <Logout handleUserName={handleUserName} socket={socket}/>}
        {!userName ? (
          <Login handleUserName={handleUserName} setSocket={setSocket} />
        ) : (
          <ChatView from={userName} socket={socket} />
        )}
      </main>
    </>
  );
}

export default App;
