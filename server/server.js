const express = require('express');
const app = express();

//mergar socket och express servern
const http = require('http').createServer(app);
const io = require('socket.io')(http, { origins: '*:*' });

const { getClient, getDB, createObjectId } = require('./db');

app.use(express.json());

app.get('/chat', (req, res) => {
  const db = getDB();
  db.collection('rooms')
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

function validate(data) {
  return !!data.room; // konverterar till boolean
}

app.post('/chat', (req, res) => {
  const db = getDB();
  let data = req.body;
  console.log(data);
  if (validate(data) === false) return res.status(400).end();

  db.collection('rooms')
    .insertOne(data)
    .then((result) => {
      data._id = result.insertedId;
      data.message = [];
      console.log('from THEN ', data);
      if (_socket) {
        _socket.broadcast.emit('new_room', result);
      }
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.delete('/chat/:id', (req, res) => {
  console.log(req.params.id);
  let roomId = req.params.id;
  const db = getDB();
  console.log(roomId);

  db.collection('rooms')
    .deleteOne({ _id: createObjectId(roomId) })
    .then(() => {
      if (_socket) {
        _socket.broadcast.emit('delete_room', roomId);
      }
      res.status(204).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

let _socket = null;

// lyssnar på alla connections
io.on('connection', (socket) => {
  _socket = socket;
  console.log('a user connected', socket.id); // loggar varje gång någon connectar
  socket.emit('welcome', 'welcome');

  socket.on('joinRoom', (room, roomId) => {
    socket.join(room);
    console.log('RoomName', room, ' id ', roomId);
    //** Skickar till ANDRA när någon joinar ett rum
    socket.to(room).emit('newUSER', 'NEW USER JOINED THE ROOM ' + room);
    const db = getDB();

    db.collection('rooms')
      .find({ _id: createObjectId(roomId) })
      .toArray()
      .then((dbData) => {
        console.log('room: ', dbData);

        // ** SKICKAR ALL RUMSDATA
        socket.emit('rooms', dbData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  });

  // ** NYTT MSG
  // Måste vara utanför rummet!
  socket.on('new_message', (data, room, id) => {
    const db = getDB();

    db.collection('rooms')
      .updateOne({ _id: createObjectId(id) }, { $push: { messages: data } })
      .then((res) => {
        socket.broadcast.to(room).emit('message', data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});
