import React, { useState } from 'react';

import sendMsg from '../actions/sendMsg';

export default function WriteMsg({ from }) {
  const [msg, handleMsg] = useState('');

  function handleSend() {
    console.log('Will send the msg', msg);
    let data = {
      from: from,
      msg: msg,
    };
    console.log(data);

    sendMsg(data);
    // sendMsg(from, msg);
    return handleMsg('');
  }

  return (
    <section>
      <input type='text' onChange={(e) => handleMsg(e.target.value)} />
      <input type='submit' value='Send' onClick={() => handleSend()} />
    </section>
  );
}
