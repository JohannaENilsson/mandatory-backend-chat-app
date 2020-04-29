const express = require('express');
const app = express();

//mergar socket och express servern
const http = require('http').createServer(app);
const io = require('socket.io')(http, { origins: '*:*' });

// Sparar responsen från clienten ska sparas i DB
let data = [];

// Definerier routen där frontenden ska hämta
app.get('/chat', (req, res) => {
  res.send({ data });
});

// lyssnar på alla connections
io.on('connection', (socket) => {
  console.log('a user connected', socket.id); // loggar varje gång någon connectar

  socket.on('new_message', (clientInfo) => {
    console.log(clientInfo);
    data.push(clientInfo);
    console.log(data);
    socket.broadcast.emit('message', clientInfo);
    // broadcast skickar till alla utom mig själv
  });
});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});
