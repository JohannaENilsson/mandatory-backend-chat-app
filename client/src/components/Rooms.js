import React, { useEffect, useState } from 'react';

import RenderRooms from './RenderRooms';

import {getRooms, createRoom} from '../actions/axios';

export default function Rooms() {
    const [allRooms, setAllRooms] = useState(null);
    const [newRoom, setNewRoom] = useState('');

    useEffect(() => {
        getRooms()
          .then((res) => {
            console.log(res.data);
            setAllRooms(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

      function handleNewRoom(e){
        e.preventDefault();
        console.log('add room')

        if(newRoom){
            console.log(newRoom);
        createRoom(newRoom)
        .then((res) => {
            console.log(res.data);
            setAllRooms([...allRooms, res.data]);
            setNewRoom('');
          })
          .catch((err) => {
            console.error(err);
          });
        }
      }
console.log('AllRooms ', allRooms);

  return (
    <section>
        <p>Handle Rooms</p>
      <form>
        <input
          type='text'
          minLength='1'
          maxLength='10'
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
        />
        <input
          type='submit'
          value='Add room'
          onClick={(e) => handleNewRoom(e)}
        />
      </form>
      <RenderRooms setAllRooms={setAllRooms} allRooms={allRooms}/>
    </section>
  );
}
