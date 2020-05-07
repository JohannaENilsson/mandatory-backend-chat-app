import React, { useState } from 'react';
import io from 'socket.io-client';

export default function Login({ handleUserName, setSocket }) {
  const [inputValue, setInputValue] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    handleUserName(inputValue.trim());
    setSocket(io('localhost:8000')); // connectar till socket
  }

  return (
    <section>
      <form>
        <input
          type='text'
          minLength='1'
          maxLength='10'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type='submit' value='Login' onClick={(e) => handleLogin(e)} />
      </form>
    </section>
  );
}
