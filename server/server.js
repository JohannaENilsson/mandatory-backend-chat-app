const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {origins: '*:*'});

let users = [
  {name: 'Viktor'}
];

app.use(express.static('build'));

app.get('/users', (req, res) => {
  res.send({users});
});

let clients = [];

io.on('connection', (socket) => {
  clients.push(socket);
  console.log('a user connected', socket.id);

  socket.on('new_message', (data) => {
    socket.emit('message', data);
  });
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});