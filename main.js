const list = document.getElementById('room_list');
socket.emit('joinRoom', { list });
socket.on('roomUsers', ({ list }) => {
    outputList(list)
  });

  function outputRoomName(room) {
    list.innerHtml = '';
    room.forEach((room) =>{
      const lo = document.createElement('li')
      lo.innterText = room.room;
      list.appendChild(li);
    })
  }

