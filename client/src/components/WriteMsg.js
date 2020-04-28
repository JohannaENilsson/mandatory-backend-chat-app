import React, { useState } from 'react';

export default function WriteMsg({ handleSend }) {
  const [inputValue, handleInputValue] = useState('');

  function submitMsg(inputValue) {
    let removedWhiteSpace = inputValue.trim();
    handleSend(removedWhiteSpace);
    handleInputValue('');
  }

  return (
    <section>
      <input
        type='text'
        minLength='1'
        maxLength='30'
        value={inputValue}
        onChange={(e) => handleInputValue(e.target.value)}
      />
      <input type='submit' value='Send' onClick={() => submitMsg(inputValue)} />
    </section>
  );
}
