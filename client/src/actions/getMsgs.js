import axios from 'axios';

export default function getMsgs() {
    axios('/chat').then((data) => {
        console.log('from server', data);
        console.log('from server', data.data);
      });
      
}
