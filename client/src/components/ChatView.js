import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';
import Rooms from './Rooms';

export default function Chatview({ socket, from }) {
  const [newMsg, setNewMsg] = useState([]);
  const [data, setData] = useImmer([]);
  const [roomMsg, setRoomMsg] = useImmer([]);
  const [roomName, setRoomName] = useState(null);
  const [activeRoom, setActiveRoom] = useState('5eaa9205995ed26ad0b8e74c');

  function resetMsgArray() {
    setRoomMsg((draft) => {
      draft.length = 0;
    });
  }

  useEffect(() => {
    socket.on('rooms', (data) => {
      setActiveRoom(data[0]._id);
      console.log('resp data ', data[0].messages);
      let resp = data[0].messages;
      setRoomName(data[0].room);

      resp.map((oneMessage) => {
        // console.log(oneMessage);
        return setRoomMsg((draft) => {
          draft.push(oneMessage);
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

  function changeRoom(id) {
    if (activeRoom !== id) {
      resetMsgArray();
      socket.emit('change room', id);
    }
  }

  return (
    <>
      {!roomName ? (
        <p>Loading</p>
      ) : (
        <>
          <h1>
            Welcome {from} to this chat {roomName}
          </h1>
          <WriteMsg handleSend={handleSend} />
          <RenderMsgs newMsg={newMsg} allMsgs={roomMsg} />
          <Rooms changeRoom={changeRoom} />
        </>
      )}
    </>
  );
}
