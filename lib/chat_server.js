var io = require('socket.io');

var createChat = function (server) {
  var anything = io.listen(server);
  anything.sockets.on('connection', function (socket) {
    socket.emit('message', { text: 'this is the text' });
    socket.on('message', function (data) {
      console.log(data);
      anything.sockets.emit("server-message", data)
    });
  });
};

module.exports = createChat;