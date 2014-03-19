(function(root){
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var newChat = new ChatApp.Chat();
  var socket = io.connect();

  socket.on('server-message', function(data, nickname){
    if ($('#content').children().length > 5) {
      $('#content').children().first().remove();
    };
    $('#content').append("<div class=\"alert alert-success\"><strong>" + nickname + "</strong>: " + data + "</div>");
  });

  socket.on('error-message', function(error){
    $('.container').prepend("<div class='alert alert-warning alert-dismissable'>" +
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">' +
      "&times;" + '</button>' +
      error + "</div>");
  });

  var nickname = "";

  var getMessage = function() {
    var msg = $('input.chat').val();
    if (msg.match(/\/nick/)) {
      nickname = msg.match(/(\w+$)/)[0];
      // console.log(nickname)
      newChat.sendName({nickname: nickname});
    } else {
      newChat.sendMessage(msg);
    }
  };

  $(document).ready(function () {
    $('button').on("click", function(event) {
      event.preventDefault();
      getMessage();
    });
  });


})(this);