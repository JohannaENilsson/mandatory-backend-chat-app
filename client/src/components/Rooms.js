import React, { useEffect, useState } from 'react';

import RenderRooms from './RenderRooms';
import { getRooms, createRoom, deleteRoom } from '../actions/axios';

export default function Rooms({ changeRoom}) {
  const [allRooms, setAllRooms] = useState(null);
  const [newRoom, setNewRoom] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getRooms()
      .then((res) => {
        // console.log(res.data);
        setAllRooms(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function isNameUnique(name) {
    let isValid = true;
    allRooms.filter((room) => {
      if (room.room === name) {
        return (isValid = false);
      }
      return null;
    });
    console.log('VALID IS ', isValid);
    return isValid;
  }

  function handleNewRoom(e) {
    e.preventDefault();
    console.log('add room');
    let removedWhiteSpace = newRoom.trim();

    let isValidName = isNameUnique(removedWhiteSpace);

    if (isValidName) {
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

  function handleDeleteRoom(id) {
    deleteRoom(id)
      .then((res) => {
        console.log(res);
        let allRoomsExceptDeleted = allRooms.filter((x) => {
          return x._id !== id;
        });
        setAllRooms(allRoomsExceptDeleted);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <p>Handle Rooms</p>
      {error && <p>Give the room a unique name</p>}
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
      <RenderRooms allRooms={allRooms} handleDeleteRoom={handleDeleteRoom}  changeRoom={changeRoom}/>
    </section>
  );
}
