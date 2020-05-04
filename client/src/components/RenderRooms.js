import React from 'react';



export default function RenderRooms({allRooms, handleDeleteRoom}) {
  
  function handleRoom(e, id) {
    console.log(id);
  }

  let rooms;
  if (!allRooms) {
    rooms = <p>No rooms</p>;
  } 
  else {
    rooms = allRooms.map((room, idx) => {
      return (
        <React.Fragment key={idx}>
        <p onClick={(e) => handleRoom(e, room._id)}>
          {room.room}
        </p>
        <button onClick={(e) => handleDeleteRoom(room._id)}>Delete room</button>
        </React.Fragment>
      );
    });
  }

  return <section>{ rooms }</section>
}
