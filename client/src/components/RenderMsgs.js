import React, { useState } from 'react';

export default function RenderMsgs({ newMsg, allMsgs }) {
  let messages;
  if (!allMsgs) {
    messages = <p>Loading...</p>;
  } else if (allMsgs.length === 0) {
    messages = <p>No messages</p>;
  } else {
    messages = allMsgs.map((msg, idx) => {
      return (
        <section key={idx}>
          <span>{msg.from}: </span>
          <span>{msg.msg}</span>
        </section>
      );
    });
  }

  let newMessages;

  if(newMsg){
    newMessages = newMsg.map((msg, idx) => {
    return (
      <section key={idx}>
        <span>{msg.from}: </span>
        <span>{msg.msg}</span>
      </section>
    );
  })
} else{
  return;
}

  return (
    <div className='msgContainer' aria-label={'message-container'}>
      {messages}
      {newMessages}
      {/* <section >
        <span>{newMsg.from}: </span>
        <span>{newMsg.msg}</span>
      </section> */}

    </div>
  );
}
