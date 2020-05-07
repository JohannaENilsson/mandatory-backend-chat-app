import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';
import Rooms from './Rooms';

export default function Chatview({ socket, from }) {
  const [data, setData] = useImmer([]);
  const [roomMsg, setRoomMsg] = useImmer([]);
  const [roomName, setRoomName] = useState(null);
  const [activeRoom, setActiveRoom] = useState();

  function resetMsgArray() {
    setRoomMsg((draft) => {
      draft.length = 0;
    });
  }


  useEffect(() => {
    socket.on('welcome', (msg) => {
      console.log(msg);
    })
  }, [])

  useEffect(() => {
    socket.on('newUSER', (msg) => {
      console.log(msg);
    });
  }, [])

  useEffect(() => {
    socket.on('left', (msg) => {
      console.log(msg);
    });
  }, [])

  useEffect(() => {
    socket.on('rooms', (data) => {
      // sparar ID
      // setActiveRoom(data[0]._id); ************************************
      //Sparar NAMNET
      setRoomName(data[0].room);

      console.log('resp data ', data);
      console.log('resp data [0]', data[0].messages);

      let resp = data[0].messages;
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
      console.log('I GOT -> ', data);
      setRoomMsg((draft) => {
        draft.push(data);
      });
    });
  }, []);

  function handleSend(inputValue) {
    console.log('WHEN');
    let data = {
      from: from,
      msg: inputValue,
      to: 'userName/Room',
      timeStamp: 'Date',
    };
    socket.emit('new_message', data, roomName, activeRoom);
    setRoomMsg((draft) => {
      draft.push(data);
    });
  }

  function changeRoom(id, name) {
    console.log('The room i clicked on ', id, name);
    if (activeRoom !== id) {
      console.log(activeRoom, id);
      resetMsgArray();
      // socket.emit('leaveRoom',roomName, activeRoom, id);
      socket.emit('joinRoom', name, id);
      setActiveRoom(id);
      
    }
  }

  return (
    <>
    <Rooms changeRoom={changeRoom} socket={socket}/>
      {!activeRoom ? (
        <h1>
        {from} join a room 
      </h1>
      ) : (
        <>
          <h1>
            Welcome {from} to this chat {roomName}
          </h1>
          <WriteMsg handleSend={handleSend} />
          <RenderMsgs allMsgs={roomMsg} />
          {/* <RenderMsgs newMsg={newMsg} allMsgs={roomMsg} /> */}
          
        </>
      )}
    </>
  );
}
