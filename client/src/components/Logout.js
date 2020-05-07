import React, { useState } from 'react';

export default function Logout({ handleUserName, socket }) {
  const [logout, setLogout] = useState(false);

  function handleLogout() {
    setLogout(true);
    handleUserName(logout);
    socket.close();    
  }

  return <button style={{position: 'absolute', top: '15px', left: '15px'}} onClick={() => handleLogout()}>X</button>;
}
