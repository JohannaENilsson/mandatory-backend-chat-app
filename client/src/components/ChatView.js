import React, { useState, useEffect } from 'react';
import axios from 'axios'; // remove????
import { useImmer } from 'use-immer';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';

export default function Chatview({ socket, from }) {
  const [allMsgs, handleAllMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState([]);
  const [data, setData] = useImmer([]);

  // När sidan laddas FÖRSTA gången
  useEffect(() => {
    socket.on('allMsgs', (data) => {
      // console.log('>> all incoming messages:', data);
      data.map((da) => {
        return setData((draft) => {
          draft.push(da);
        });
      });
      
    });
  }, []);


  useEffect(() => {
    socket.on('message', (data) => {
      // console.log('I GOT -> ', data);
      setData((draft) => {
        draft.push(data);
      });
    });
  }, []);

  function handleSend(inputValue) {
    let data = {
      from: from,
      msg: inputValue,
      to: 'userName/Room',
      timeStamp: 'Date',
    };
    socket.emit('new_message', data);
    setData((draft) => {
      draft.push(data);
    });
  }

  return (
    <>
      <h1>Welcome {from} to this chat room</h1>
      <WriteMsg handleSend={handleSend} />
      <RenderMsgs newMsg={newMsg} allMsgs={data} />
    </>
  );
}
