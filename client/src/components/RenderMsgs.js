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
        <li key={idx}>
          <span>{msg.from}: </span>
          <span>{msg.msg}</span>
        </li>
      );
    });
  }

  return <><ul>{messages}</ul></>;
}
