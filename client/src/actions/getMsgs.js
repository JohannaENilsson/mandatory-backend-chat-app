import axios from 'axios';

export default function getMsgs() {
  return axios('/chat');
  
}
