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

app.get('/chat/:id', (req, res) => {
  let userID = req.params.id;

  const db = getDB();
  db.collection('rooms')
    .findOne({ _id: createObjectId(userID) }) // hämtar en user
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function validate(user) {
  return !!user.room; // konverterar till boolean
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

  db.collection('rooms')
    .deleteOne({ _id: createObjectId(roomId) })
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// lyssnar på alla connections
io.of('/chat').on('connection', (socket) => {
  console.log('a user connected', socket.id); // loggar varje gång någon connectar
  socket.emit('welcome', 'welcome');
  
  socket.on('joinRoom', (room, roomId) =>{
    socket.join(room);
    console.log('RoomName', room,' id ', roomId);
    //** Skickar till ANDRA när någon joinar ett rum
    socket.to(room).emit('newUSER', 'NEW USER JOINED THE ROOM ' + room);
    const db = getDB();
    
    db.collection('rooms')
    .find({ _id: createObjectId(roomId) })
    .toArray()
    .then((dbData) => {
      console.log('room: ', dbData);

      // ** SKICKAR ALL RUMSDATA
      // io.to(room).emit('rooms', dbData);
      socket.emit('rooms', dbData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

    // ** NYTT MSG
    socket.on('new_message', (data) => {
      console.log('i got THIS msg ', data);
      io.of('/chat').in(room).emit('message', data);
      // io.to(room).emit('message', data);
      // socket.emit('message', data);
  
    })
    
  });

  
  

  // let roomId = '5eb134d96b4bed55606f17fb';
  // // skicka all data som finns i db när man connectat
  // const db = getDB();
  // db.collection('rooms')
  //   .find({ _id: createObjectId(roomId) })
  //   .toArray()
  //   .then((dbData) => {
  //     console.log('room: ', dbData);
  //     socket.emit('rooms', dbData);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).end();
  //   });

  // // Bytar rum
  // socket.on('change room', (id) => {
  //   console.log(id);
  //   roomId = id;

  //   db.collection('rooms')
  //     .find({ _id: createObjectId(roomId) })
  //     .toArray()
  //     .then((dbData) => {
  //       console.log('room: ', dbData);
  //       socket.emit('rooms', dbData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).end();
  //     });

  //   // Tar emot meddelanden
  //   socket.on('new_message', (clientInfo) => {
  //     console.log('a NEW msg ', clientInfo);
  //     // Skickar new_message till db
  //     db.collection('rooms')
  //       .find({ _id: createObjectId(roomId) })
  //       .insertOne(clientInfo)
  //       .then((result) => {
  //         clientInfo._id = result.insertedId;
  //         // skickar tillbaka till alla anrda
  //         socket.broadcast.emit('message', clientInfo);
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //         res.status(500).end();
  //       });
  //   });
  

  
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

// startar servern - socket startas automatiskt
http.listen(8000, () => {
  console.log('listening on *:8000');
});

// Definerier routen där frontenden ska hämta
// app.get('/chat', (req, res) => {
//   const db = getDB();
//   db.collection('msgs')
//     .find({})
//     .toArray()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });
