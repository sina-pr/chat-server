const express = require('express'); // Backend App (server)
const cors = require('cors'); // HTTP headers (enable requests)
const http = require('http');
const socketio = require('socket.io');
const { ORIGIN } = require('../constants');
const joinNewUser = require('../game/game');

// initialize app
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let messages = [
  {
    id: Date.now().toString() + 'username',
    username: 'username',
    content: 'this is message content',
    created: Date.now(),
  },
];

server.listen(443);
io.on('connection', (socket) => {
  console.log('NEW USER CONNECTED');
  // socket.on('join', (data) => {
  //   const { roomID, user } = data;
  //   console.log('User:', user, '\nroomID:', roomID);
  //   users[0].players.push(user);
  //   io.emit('welcome_user', `welcome ${user.username} `);
  //   console.log(users[0].players);
  // });
  socket.on('send_msg', (msgData) => {
    console.log(msgData);
    const { username, content } = msgData;
    console.log(username, content);
    const msg = {
      id: Date.now().toString() + username,
      username: username,
      content: content,
      created: Date.now(),
    };
    messages.push(msg);
    console.log(messages);
    io.emit('get_msg', msg);
  });
  socket.on('get_all_messages', () => {
    console.log('JLDf');
    socket.emit('get_all', messages);
  });
});

// middlewares
app.use(cors({ origin: ORIGIN }));
app.use(express.json({ extended: true })); // body parser
app.use(express.urlencoded({ extended: false })); // url parser

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send();
  next();
});

module.exports = {
  app,
  io,
};
