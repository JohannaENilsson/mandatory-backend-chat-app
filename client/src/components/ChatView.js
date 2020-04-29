import React, { useState, useEffect } from 'react';
import axios from 'axios'; // remove????

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';

export default function Chatview({ socket ,from }) {
  const [msg, handleMsg] = useState('');
  const [allMsgs, handleAllMsgs] = useState(null);
  const [newMsg, setNewMsg] = useState(false);


useEffect(() => {
    socket.on('allMsgs', (data) => {
        console.log(data);
        handleAllMsgs(data);
    })
  }, []);

//   useEffect(() => {
//     socket.on('message', (data) => {
//         console.log(data);
//         handleAllMsgs(data);
//     })

//     return () => {
//       setNewMsg(false);
//     };
//   }, [newMsg]);

 
    socket.on('message', (data) => {
        console.log('I GOT -> ', data);
        // allMsgs.push(data[0]);
        setNewMsg(true);
      });
  

//   if (socket) {
//     // Lyssnar på meddelande från servern
//       socket.on('message', (data) => {
//       console.log('Got this from SERVER ', data);
//     });
//   }

  function handleSend(inputValue) {
    handleMsg(inputValue);
    let data = {
      from: from,
      msg: inputValue,
      to: 'userName/Room',
      timeStamp: 'Date',
    };
    console.log('I sent THIS ->', data);

    socket.emit('new_message', data);
    allMsgs.push(data);
    console.log(allMsgs);
  }

  return (
    <>
      <h1>Welcome {from} to this chat room</h1>
      <WriteMsg handleSend={handleSend} />
      <RenderMsgs newMsg={msg} allMsgs={allMsgs} />
    </>
  );
}
