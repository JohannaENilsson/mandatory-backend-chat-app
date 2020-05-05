import React from 'react';

export default function RenderRooms({ allRooms, handleDeleteRoom, changeRoom }) {
  

  let rooms;
  if (!allRooms) {
    rooms = <p>No rooms</p>;
  } else {
    rooms = allRooms.map((room, idx) => {
      return (
        <React.Fragment key={idx}>
          <li onClick={(e) => changeRoom(room._id)}>
            <span>{room.room} </span>
            <button onClick={(e) => handleDeleteRoom(room._id)}>Delete</button>
          </li>
        </React.Fragment>
      );
    });
  }

  return (
    <section>
      <ul>{rooms}</ul>
    </section>
  );
}
