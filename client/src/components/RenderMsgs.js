import React, {useState} from 'react';

export default function RenderMsgs({newMsg}){
    console.log(newMsg);
     

    return(
        <section>
        <p>No messages</p>
        {newMsg}
        </section>
    );
}