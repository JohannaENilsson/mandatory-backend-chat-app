import React, { useEffect, useState } from 'react';

import RenderRooms from './RenderRooms';
import { getRooms, createRoom, deleteRoom } from '../actions/axios';

export default function Rooms({ changeRoom, socket }) {
  const [allRooms, setAllRooms] = useState(null);
  const [newRoom, setNewRoom] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    handleRooms();
  }, []);

  useEffect(() => {
    socket.on('new_room', (res) => {
      handleRooms();
    });
  }, []);

  useEffect(() => {
    socket.on('delete_room', (res) => {
      handleRooms();
    });
  }, []);

  function handleRooms() {
    return getRooms()
      .then((res) => {
        setAllRooms(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function isNameUnique(name) {
    let isValid = true;
    allRooms.filter((room) => {
      if (room.room === name) {
        return (isValid = false);
      }
      return null;
    });
    return isValid;
  }

  function handleNewRoom(e) {
    e.preventDefault();
    let removedWhiteSpace = newRoom.trim();

    let isValidName = isNameUnique(removedWhiteSpace);

    if (isValidName) {
      createRoom(removedWhiteSpace)
        .then((res) => {
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
      <RenderRooms
        allRooms={allRooms}
        handleDeleteRoom={handleDeleteRoom}
        changeRoom={changeRoom}
      />
    </section>
  );
}