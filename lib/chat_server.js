var io = require('socket.io');

var createChat = function (server) {
  var anything = io.listen(server);
  anything.sockets.on('connection', function (socket) {
    guestnumber++;
    nicknames[socket.id] = "guest" + guestnumber;

    socket.on('nickname', function(nickname) {
      nicknameChangeRequest(nickname, socket);
    })

    socket.on('message', function (data) {
      anything.sockets.emit("server-message", data, nicknames[socket.id])
    });
  });
};

var nicknames = {};

var nicknameChangeRequest = function(nickname, socket) {
  var taken = false;

  Object.keys(nicknames).forEach(function(takenNumber) {
    if (nickname.nickname === nicknames[takenNumber]) {
      taken = true;
      socket.emit('error-message', "Nickname has been taken");
      console.log("taken dude...");
    }; // add condition for if nickname starts with 'guest'
  });

  if (taken === false) {
    nicknameChangeResult(nickname, socket.id);
  };
  console.log(nicknames);
};

var nicknameChangeResult = function (newNickname, newGuestNumber) {
  nicknames[newGuestNumber] = newNickname.nickname;
  console.log(nicknames);
}

var guestnumber = 1;


module.exports = createChat;