import React, { useState } from 'react';

export default function Login({ handleUserName }) {
  const [inputValue, setInputvalue] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    handleUserName(inputValue.trim());
  }

  return (
    <section>
      <input
        type='text'
        minLength='1'
        maxLength='10'
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <input type='submit' value='Login' onClick={handleLogin} />
    </section>
  );
}
