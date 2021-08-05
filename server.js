const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser,userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, './utils/users')));

const botName = 'Chat Bot';

// run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

            // Welcomes current user
    socket.emit('message', formatMessage(botName, 'Welcome!'));
    // User connects 
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    // Send user and room info
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users:getRoomUsers(user.room)
    });
});





    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

        // User disconnects 
        socket.on('disconnect', () =>{
            const user = userLeave(socket.id);

            if(user) {
                io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left`));
                    // Send user and room info
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users:getRoomUsers(user.room)
        });

    }
});
});

let PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));