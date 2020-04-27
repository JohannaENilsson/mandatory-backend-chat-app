import React, {useState} from 'react';


export default function Login({handleUserName}){
    const [inputValue, setInputvalue] = useState('')
    

    function handleLogin(e){
        e.preventDefault();
        console.log(inputValue);
        handleUserName(inputValue);
    }

    return(
        <section>
            <input type='text' onChange={(e) => setInputvalue(e.target.value)}/>
            <input type='submit' value='Login' onClick={handleLogin}/>
        </section>
    );
}