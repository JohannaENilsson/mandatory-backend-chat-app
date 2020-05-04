import React from 'react';



export default function RenderRooms({setAllRooms, allRooms}) {
  // const [allRooms, setAllRooms] = useState(null);



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
        <p key={idx} onClick={(e) => handleRoom(e, room._id)}>
          {room.room}
        </p>
      );
    });
  }

  return <section>{ rooms }</section>
}
