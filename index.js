const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const url = require("url")
const qs = require("querystring");   
    function fn() {
        const parsedUrl = url.parse(process.argv[2])
        const query = qs.parse(parsedUrl.query);
        console.log("query a is " + query["a"]);
        console.log("query b is " + query["b"]);
    }
    module.exports.fn = fn();

// Get username and room from URL
const { username, room} = qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io('https://chatnonymous-bot-deploy.herokuapp.com/');

// join Chat room

socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({ room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit 
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    // get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// output message to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time} </span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

