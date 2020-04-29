import React, {useState} from 'react';

// Lägg till diconect sluta lyssna

export default function Logout({handleUserName, socket}){
    const [logout, setLogout] = useState(false);

    function handleLogout(){
        console.log('You will logout');
        setLogout(true);
        handleUserName(logout);
        socket.close();
        console.log(socket.close());

    }
     

    return(
        <button onClick={() => handleLogout()}>X</button>
    );
}