const socket = io()
const list = [];
const list = document.getElementById('room_list');
socket.emit('joinRoom', { list });
socket.on('roomUsers', ({ list }) => {
    outputList(list)
  });

function outputList(room) {
    list.innerText = room;
  }

  function outputList(list) {
    outputList.innerHTML = '';
    room.forEach((list) => {
      const li = document.createElement('li');
      li.innerText = room.list;
      List.appendChild(li);
    });
  }