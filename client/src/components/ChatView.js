import React, { useState } from 'react';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';

import sendMsg from '../actions/sendMsg';
import getMsgs from '../actions/getMsgs';

export default function Chatview({ from }) {
  const [msg, handleMsg] = useState('');
  const [allMsgs, handleAllMsgs] = useState('');

  function handleSend(inputValue) {
    handleMsg(inputValue);
    let data = {
      from: from,
      msg: inputValue,
      to: 'userName/Room',
      timeStamp: 'Date',
    };
    console.log(data);

    sendMsg(data);
  }
  getMsgs();

  return (
    <>
      <h1>Welcome {from} to this chat room</h1>
      <WriteMsg handleSend={handleSend} />
      <RenderMsgs newMsg={msg} />
    </>
  );
}
