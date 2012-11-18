// Load default nodejs http module
var http = require("http");

// Port http server will listen on
var globalport = 1337;

function start(port) {
	port = port || globalport;
	http.createServer(function(request, response) {
		console.log("Woot we have a client!");
		response.writeHead( 200, {"Content-Type": "text/plain"} );
		response.write("This is a super awesome response from you friendly neighborhood webserver!");
		response.end();
	}).listen(port);

	console.log("Started server on port", port);
}

exports.start = start;
