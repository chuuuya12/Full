const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
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

// Set static folder
app.use(express.static(path.join(__dirname)));

const botName = 'The Muse Bot ';



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
function connect(socket, data){
	//generate clientId
	data.clientId = generateId();

	// save the client to the hash object for
	// quick access, we can save this data on
	// the socket with 'socket.set(key, value)'
	// but the only way to pull it back will be
	// async
	chatClients[socket.id] = data;

	// now the client objtec is ready, update
	// the client
	socket.emit('ready', { clientId: data.clientId });
	
	// auto subscribe the client to the 'lobby'
	subscribe(socket, { room: 'lobby' });

	// sends a list of all active rooms in the
	// server
	socket.emit('roomslist', { rooms: getRooms() });
  console.log(data.clientId)
}

const INDEX = '/chat.html';

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
