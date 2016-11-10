'use strict'

const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);


const port = 3000;


// handling the client by rerouting to client side
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) =>{
  console.log('a user connected');
});

io.on('connection', (socket) =>{
  socket.on('chat message', (msg) =>{
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.emit('some event', { for: 'everyone' });

http.listen(port, () => {
  console.log('Server is running on port ', port);
});
