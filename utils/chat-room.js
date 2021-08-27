  
function ChatRoom(room) {
	this.room = room;
	this.maxUsers = Number.POSITIVE_INFINITY;
}
ChatRoom.prototype.isAvailable = function() {
    return this.available === "available";
  };

  ChatRoom.prototype.getActiveUserCount = function() {
    return this.users.length;
  };

  ChatRoom.prototype.addUser = function(user) {
	// check if this user already is in the chat
	for (var i = 0; i < this.users.length; i++) {
	    if (this.users[i].id == user.id) {
	        return;
	    }
	}

	this.users.push(user);
}
ChatRoom.prototype.removeUser = function(user) {
	for (var i = 0; i < this.users.length; i++) {
	    if (this.users[i].id == user.id) {
	        this.users.splice(i, 1);
	        break;
	    }
	}
}

module.exports = ChatRoom;
