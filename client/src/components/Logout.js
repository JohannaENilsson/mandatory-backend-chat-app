import React, { useState } from 'react';

export default function Logout({ handleUserName, socket }) {
  const [logout, setLogout] = useState(false);

  function handleLogout() {
    setLogout(true);
    handleUserName(logout);
    socket.close();    
  }

  return <button onClick={() => handleLogout()}>X</button>;
}
