import React, { useState } from 'react';

export default function RenderMsgs({ newMsg, allMsgs }) {
//   console.log('new msg ', newMsg);
  console.log('all msgs ', allMsgs);

  return (
    <div className='msgContainer' aria-label={'message-container'}>
      {!allMsgs ? (
        <p>No messages</p>
      ) : (
        
          allMsgs.map((msg, idx) => {
            return <section key={idx}>
                <span>{msg.from}: </span>
                <span>{msg.msg}</span>
                </section>;
          })
        
      )}

      {newMsg}
    </div>
  );
}
