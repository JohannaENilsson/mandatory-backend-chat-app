import io from 'socket.io-client';

// export default function sendMsg(from, msg) {
export default function sendMsg(data) {
    console.log(data);
  const socket = io('localhost:8000');

  return socket.emit('info', data);
}
