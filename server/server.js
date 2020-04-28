const express = require('express');
const app = express();

//mergar socket och express servern
const http = require('http').createServer(app); 
const io = require('socket.io')(http, {origins: '*:*'}); 

// let users = [
//   {name: 'Viktor'}
// ];


// Sparar responsen från clienten ska sparas i DB
let data = [];


// app.get('/users', (req, res) => {
//   res.send({users});
// });

// så frontenden kan hämta
app.get('/chat', (req, res) => {
  res.send({data});
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

  // socket.on('user', (user) => {
  //   console.log(user);
  //   console.log(users);
  //   users.push({name: user})
  //   socket.emit('message', user);
  //  });


   socket.on('info', (info) => {
    console.log(info);
    data.push(info)
    console.log(data);
    socket.emit('message', info);
   });

});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});