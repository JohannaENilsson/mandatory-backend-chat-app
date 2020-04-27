import React, {useState} from 'react';

export default function Logout(){
    const [inputValue, setInputvalue] = useState('');
     

    return(
        <button onClick={() => console.log('close this session')}>Logout</button>
    );
}