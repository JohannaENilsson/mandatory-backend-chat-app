import React from 'react';

import WriteMsg from './WriteMsg';
import RenderMsgs from './RenderMsgs';


export default function Chatview({from}) {
  return (
    <>
      
      <WriteMsg from={from}/>
      <RenderMsgs />
    </>
  );
}
