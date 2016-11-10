'use strict'
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) =>{
    io.emit('chat message', msg);
  });
});;

http.listen(3001, () => {
  console.log('listening on *:3001');
});
