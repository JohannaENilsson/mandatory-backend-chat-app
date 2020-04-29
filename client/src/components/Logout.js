import React, {useState} from 'react';

// Lägg till diconect sluta lyssna

export default function Logout({handleUserName}){
    const [logout, setLogout] = useState(false);

    function handleLogout(){
        console.log('You will logout');
        setLogout(true);
        handleUserName(logout);

    }
     

    return(
        <button onClick={() => handleLogout()}>X</button>
    );
}