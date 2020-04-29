import React, { useState, useEffect } from 'react';
import axios from 'axios';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';

export default function Chatview({ socket ,from }) {
  const [msg, handleMsg] = useState('');
  const [allMsgs, handleAllMsgs] = useState(null);
  const [newMsg, setNewMsg] = useState(false);

  useEffect(() => {
    axios('/chat')
      .then((res) => {
        // console.log('response from server ', res.data.data);
        handleAllMsgs(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

//   useEffect(() => {
//     axios('/chat')
//       .then((res) => {
//         // console.log('response from server ', res.data.data);
//         handleAllMsgs(res.data.data);
//         console.log('DENNA ---->',allMsgs);
//       })
//       .catch((err) => {
//         console.error(err);
//       });

//     return () => {
//       setNewMsg(false);
//     };
//   }, [newMsg]);

 
    socket.on('message', (data) => {
        console.log('From server ', data);
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
    console.log(data);

    socket.emit('new_message', data);
    allMsgs.push(data);
  }

  return (
    <>
      <h1>Welcome {from} to this chat room</h1>
      <WriteMsg handleSend={handleSend} />
      <RenderMsgs newMsg={msg} allMsgs={allMsgs} />
    </>
  );
}
