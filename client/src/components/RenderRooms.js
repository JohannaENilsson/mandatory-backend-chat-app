import React from 'react';

export default function RenderRooms({
  allRooms,
  handleDeleteRoom,
  changeRoom,
}) {
  let rooms;
  if (!allRooms) {
    rooms = <p>No rooms</p>;
  } else {
    rooms = allRooms.map((room, idx) => {
      return (
        <React.Fragment key={idx}>
          <li>
            <span onClick={(e) => changeRoom(room._id, room.room)}>
              {room.room}{' '}
            </span>
            <button onClick={(e) => handleDeleteRoom(room._id)}>Delete</button>
          </li>
        </React.Fragment>
      );
    });
  }

  return (
    
      <ul>{rooms}</ul>
    
  );
}
