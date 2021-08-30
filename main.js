const list = document.getElementById('room_list');
socket.emit('joinRoom', { list });
socket.on('roomUsers', ({ list }) => {
    outputList(list)
  });

  function outputRoomName(room) {
    list.innerText = room;
  }