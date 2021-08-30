const room = [];
const roomList = document.getElementById('room_list');

function roomList(room) {
    roomList.innerHTML = '';
    room.forEach((room) => {
      const li = document.createElement('li');
      li.innerText = room.roomList;
      roomList.appendChild(li);
    });
  }