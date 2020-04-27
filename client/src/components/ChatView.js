import React from 'react';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';
import Logout from './Logout';

export default function Chatview() {
  return (
    <>
      <Logout />
      <WriteMsg />
      <RenderMsgs />
    </>
  );
}
