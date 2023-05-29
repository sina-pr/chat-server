const { io } = require('../utils/app');

io.on('connection', (socket) => {
  console.log('NEW USER CONNECTED');
  socket.on('message', (msg) => {
    console.log('Message received, content:', msg);
  });
});
