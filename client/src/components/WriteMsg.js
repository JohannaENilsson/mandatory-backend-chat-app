import React, {useState} from 'react';

export default function WriteMsg(){
    const [inputValue, setInputvalue] = useState('');
     

    return(
        <section>
            <input type='text' onChange={ e => setInputvalue(e.target.value)}/>
            <input type='submit' value='Send' onClick={e => console.log('Will send the msg', inputValue)}/>
        </section>
    );
}