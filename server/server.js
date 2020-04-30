const express = require('express');
const app = express();

//mergar socket och express servern
const http = require('http').createServer(app);
const io = require('socket.io')(http, { origins: '*:*' });

// Sparar responsen från clienten ska sparas i DB
let data = [];
const { getClient, getDB, createObjectId } = require('./db');

app.use(express.json());



// Definerier routen där frontenden ska hämta
app.get('/chat', (req, res) => {
  const db = getDB();
  db.collection('msgs')
    .find({})
    .toArray()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// lyssnar på alla connections
io.on('connection', (socket) => {
  console.log('a user connected', socket.id); // loggar varje gång någon connectar

  // skicka all data som finns i db när man connectat
  const db = getDB();
  db.collection('msgs')
    .find({})
    .toArray()
    .then((dbData) => {
      socket.emit('allMsgs', dbData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

  // Tar emot meddelanden
  socket.on('new_message', (clientInfo) => {
    console.log(clientInfo);
    // Skickar new_message till db
    db.collection('msgs')
      .insertOne(clientInfo)
      .then((result) => {
        clientInfo._id = result.insertedId;
        // skickar tillbaka till alla anrda
        socket.broadcast.emit('message', clientInfo);
      })
      .catch((e) => {
        console.error(e);
        res.status(500).end();
      });
  });

});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});
