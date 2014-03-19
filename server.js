var static = require('node-static');
var chat = require('./lib/chat_server');

var file = new static.Server('./public');

var app = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 8080);

chat(app)

