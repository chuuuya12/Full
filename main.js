const express = require('express');

module.exports = function(io) {
    let router = express.Router()

    // define routes
    // io is available in this scope
    router.get('...')

    return router;
}
const list = document.getElementById('listroom');
socket.emit('joinRoom', { listR });
socket.on('list', ({ list }) => {
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


