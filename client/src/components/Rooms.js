import React, { useEffect, useState } from 'react';

import RenderRooms from './RenderRooms';

import {getRooms, createRoom, deleteRoom} from '../actions/axios';

export default function Rooms() {
    const [allRooms, setAllRooms] = useState(null);
    const [newRoom, setNewRoom] = useState('');
    const [error, setError] = useState(false);

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
        let removedWhiteSpace = newRoom.trim();

        if(removedWhiteSpace){
            console.log(removedWhiteSpace);
        createRoom(removedWhiteSpace)
        .then((res) => {
            console.log(res.data);
            setAllRooms([...allRooms, res.data]);
            setNewRoom('');
          })
          .catch((err) => {
            console.error(err);
          });
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
      }

      function handleDeleteRoom(id){
        console.log('delete me ', id);
        deleteRoom(id)
        .then(res => {
            console.log(res);
            let allRoomsExceptDeleted = allRooms.filter(x => {
                return x._id !== id;
            })
            setAllRooms(allRoomsExceptDeleted);
            console.log(' allRoomsExceptDeleted ', allRoomsExceptDeleted);

        })
        .catch(err => {
            console.log(err);
        })
      }

  return (
    <section>
        <p>Handle Rooms</p>
      <form>
          {error && <p>Give the room a name</p>}
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
      <RenderRooms allRooms={allRooms} handleDeleteRoom={handleDeleteRoom}/>
    </section>
  );
}
