import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';
import Rooms from './Rooms';

export default function Chatview({ socket, from }) {
  const [roomMsg, setRoomMsg] = useImmer([]);
  const [roomName, setRoomName] = useState(null);
  const [activeRoom, setActiveRoom] = useState(null);

  function resetMsgArray() {
    setRoomMsg((draft) => {
      draft.length = 0;
    });
  }

  useEffect(() => {
    socket.on('newUSER', (msg) => {
      console.log(msg);
    });
  }, []);

  useEffect(() => {
    socket.on('rooms', (data) => {
      //Sparar NAMNET
      setRoomName(data[0].room);

      let resp = data[0].messages;
      resp.map((oneMessage) => {
        return setRoomMsg((draft) => {
          draft.push(oneMessage);
        });
      });
    });
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      setRoomMsg((draft) => {
        draft.push(data);
      });
    });
  }, []);

  function handleSend(inputValue) {
    let data = {
      from: from,
      msg: inputValue,
    };
    socket.emit('new_message', data, roomName, activeRoom);
    setRoomMsg((draft) => {
      draft.push(data);
    });
  }

  function changeRoom(id, name) {
    if (activeRoom !== id) {
      resetMsgArray();
      socket.emit('joinRoom', name, id);
      setActiveRoom(id);
    }
  }

  return (
    <>
      <Rooms changeRoom={changeRoom} socket={socket} />
      {!activeRoom ? (
        <section>
        <h1>{from} join a room</h1>
        </section>
      ) : (
        <>
        <section  className='container'>
          <h1>
            {from} you are in {roomName}
          </h1>
          
          <WriteMsg handleSend={handleSend} />
          <RenderMsgs allMsgs={roomMsg} />
          </section>
        </>
      )}
    </>
  );
}
