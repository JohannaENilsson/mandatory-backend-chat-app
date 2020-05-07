import React from 'react';

export default function RenderMsgs({ allMsgs }) {
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

  return (
    <div className='msgContainer' aria-label={'message-container'}>
      {messages}
    </div>
  );
}
