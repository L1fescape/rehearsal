var http = require('http');

http.createServer(function (req, res) {
	var body = 'Hello World\n';

	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Content-Length': body.length,
		'Set-Cookie': ["type=ninja", "language=javascript"]
	});


	res.end(body);

}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
