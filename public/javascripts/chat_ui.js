(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var newChat = new ChatApp.Chat();
  var socket = io.connect();

  socket.on('server-message', function(data){
    $('#content').prepend("<p>" + data + "</p>");
  })
  var getMessage = function() {
      var msg = $('input.chat').val();
      newChat.sendMessage(msg);

      // $('input.chat').val().empty();
  };

  $(document).ready(function () {
    $('button').on("click", function(event) {
      event.preventDefault();
      getMessage();
    });
  });


})(this);