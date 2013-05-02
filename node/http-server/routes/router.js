// Import the http module
var http = require("http");

// Import the url module for parsing request paths
var url = require("url");

// Default port to run our server on
var globalPort = 1337;

// I really like this function in other languages, so I implemented it in javascript.
Array.prototype.contains = function(element) { return (this.indexOf(element) >= 0) ? true : false }

var router = {
	"/" : function() {
		return {
			content : "Woooot!",
			head : {	
				code : 200,
				content : {"Content-Type": "text/plain"}
			}
		}
	},
	"404" : function() {
		return {
			content : "Oh noes!",
			head : {	
				code : 404,
				content : {"Content-Type": "text/plain"}
			}
		};
	},

	route : function(url) {
		var routes = ["/"];
		if (routes.contains(url))
			return router[url]();
		else
			return router["404"]();
	}
};


function start(port) {
	port = port || globalPort;

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		var resp = router.route(pathname);
		var content = resp["content"];
		var head = resp["head"];
		response.writeHead(head["code"], head["content"]);
		response.write(content);
		response.end();
	}

	http.createServer(onRequest).listen(port);
	console.log("Server running on port", port);
}

exports.start = start;
