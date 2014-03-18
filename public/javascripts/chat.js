(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var Chat = ChatApp.Chat = function () {};
  var socket = io.connect();

  Chat.prototype.sendMessage = function (message) {
    socket.emit('message', message);
  };

})(this);