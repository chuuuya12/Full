const rooml = [];
const rooml = document.getElementById('room_list');
socket.emit('joinRoom', { room });
socket.on('roomUsers', ({ room, users }) => {
    outputRoomList(list)
  });

function outputRoomList(room) {
    roomList.innerText = room;
  }