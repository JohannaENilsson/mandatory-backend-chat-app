import io from 'socket.io-client';

export default function sendMsg(data) {
  console.log(data);
  const socket = io('localhost:8000');

  socket.emit('info', data);
}
