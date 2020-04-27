const express = require('express');
const app = express();

//mergar socket och express servern
const http = require('http').createServer(app); 
const io = require('socket.io')(http, {origins: '*:*'}); 

let users = [
  {name: 'Viktor'}
];

let test = [];


app.get('/users', (req, res) => {
  res.send({users});
});

let clients = [];

// lyssnar på connection
io.on('connection', (socket) => {
  clients.push(socket);
  console.log('a user connected', socket.id);

  // Lyssnar på medelande från clienten
  socket.on('new_message', (data) => {
    // skickar meddelande till clienten
    socket.emit('message', data);
  });

  socket.on('user', (user) => {
    console.log(user);
    console.log(users);
    users.push({name: user})
    socket.emit('message', user);
   });


   socket.on('info', (data) => {
    console.log(data);
    test.push(data)
    console.log(test);
    // socket.emit('message', user);
   });

});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});