const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { createClient } = require('redis');
const redisAdapter = require('@socket.io/redis-adapter');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
var rooms = [];

rooms["MissingNo"] = "";

io.sockets.on('connection', function(socket) {

  clients[socket.id] = socket;
  console.log("CONNECTION >> " + socket.id);

  socket.on('list', function() {
console.log("LIST >> " + socket.id);
// return list of all available(at room stack) & active(has leader)
// var rspRoom = []; 
// [
//  {
//	name: "name", 
//	status: "check if socket.id is active", 
//	users: "count socket.in(room).length"
//  }
// ]
// socket.emit('responseRoomsAdvance', rspRoom);
var roomList = [];
for (key in rooms) {
    roomList.push(key);
}

socket.emit('responseRooms', roomList);
  });

  socket.on('join', function(room) {
console.log("JOIN >> " + socket.id + " room[" + room + "]");
// if room has no leader i join into it and i became the leader
// how to know if it has leader?
// check if the socket.id of the room is active   
socket.join(room);
io.sockets.in(room).emit('message', socket.id + " has joined!");

console.log("JOIN ROOM >> " + room + "[" + socket.id + "]");

// check if room has leader by 
var beLeader = false;
if ((rooms[room] !== "") && (rooms[room] in clients)) {

    console.log('LEADER of ROOM[' + room + "]: is [" + rooms[room] + "]");
    socket.emit('message', 'LEADER of ROOM[' + room + "]: is [" + rooms[room] + "]");
} else {
    // i became new leader
    rooms[room] = socket.id;
    io.sockets.in(room).emit('message', socket.id + " became room [" + room + "] leader!", socket.id);
    // next all members of the room will want to connect to me

}
})
socket.emit('responseJoinRoom', socket.id, rooms[room]); // leader socket id 

  });
  socket.on('clients', function(active) {
    console.log("CLIENTS >> " + socket.id);
    // console.log(clients);
    var keys = [];
    if (active) {
        for (var key in clients) {
      if (clients[key].connected)
          keys.push(key);
        }
    } else {
        for (var key in clients) {
      keys.push(key);
        }
    }
    socket.emit('responseClients', keys);
      });
// Set static folder
app.use(express.static(path.join(__dirname)));

const botName = 'Chat Bot';



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
