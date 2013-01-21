var	app = require('http').createServer(handler),
     io = require('socket.io').listen(app),
     fs = require('fs')
		 url = require('url');

app.listen(1337);
console.log("Listening on port 1337")

function handler (req, res) {
	var pathname = url.parse(req.url).pathname;
	if (pathname == "/") {
		fs.readFile(__dirname + '/static/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
	}
	else if (pathname == "/jquery.js") {
		fs.readFile(__dirname + '/static/jquery.js',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading jquery.js');
			}

			res.writeHead(200);
			res.end(data);
		});
	}
}

io.sockets.on('connection', function (socket) {
	socket.emit('recieve', { hello: 'world' });
	socket.on('send', function (data) {
		console.log(data);
		io.sockets.emit('receive', data);
	});
});
