const roomlist = document.getElementById('room_list');

const {room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const socket = io('https://chatnonymous-bot-deploy.herokuapp.com/chat.html');


  socket.on('roomList', ({ room }) => {
    outputRoomName(room);
  });

  function outputRoomList(users) {
    roomList.innerHTML = '';
    room.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
  