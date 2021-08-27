const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { createClient } = require('redis');
const redisAdapter = require('@socket.io/redis-adapter');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formatMessage = require('./utils/messages');
const ChatRoom = require('./utils/chat-room');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const currentUsers = 0;
const usersList = {};
const roomsList = ['main'];

// Set static folder
app.use(express.static(path.join(__dirname)));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const botName = 'The Muse Bot';





// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username,ucolor, room }) => {
    const user = userJoin(socket.id,ucolor, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName,"#000000", 'Welcome!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName,"#000000", `${user.username} has joined`)
      );

      

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username,user.ucolor, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, "#000000",`${user.username} has left`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});



const INDEX = '/chat.html';

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
