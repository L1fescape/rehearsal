// Credits
// http://www.extrawurst.org/blog11/2012/06/streaming-media-in-nodejs/
// http://pedromtavares.wordpress.com/2012/12/28/streaming-audio-on-the-web-with-nodejs/
//

// Library for reading files in Node
var fs = require('fs');
// Use Express do set up routing
// Define our app
var app = require('http').createServer(function(request, response){
	var filename = "polynation.mp3";
	fs.readFile(filename, "binary", function(err, file) {
 
		var header = {};
		// add content type to header
 
		//TODO: any more clean solution ?
		if(typeof request.headers.range !== 'undefined')
		{
			// browser wants chunged transmission
 
			var range = request.headers.range; 
			var parts = range.replace(/bytes=/, "").split("-"); 
			var partialstart = parts[0]; 
			var partialend = parts[1]; 
 
			var total = file.length; 
 
			var start = parseInt(partialstart, 10); 
			var end = partialend ? parseInt(partialend, 10) : total-1;
 
			header["Content-Range"] = "bytes " + start + "-" + end + "/" + (total);
			header["Accept-Ranges"] = "bytes";
			header["Content-Length"]= (end-start)+1;
			header['Transfer-Encoding'] = 'chunked';
			header["Connection"] = "close";
 
			response.writeHead(206, header); 
			// yeah I dont know why i have to append the '0'
			// but chrome wont work unless i do
			response.write(file.slice(start, end)+'0', "binary");
		}
		else
		{
			// reply to normal un-chunked request
			response.writeHead(200, header );
			response.write(file, "binary");
		}
 
		response.end();
	});
 
});
app.listen(1337);
console.log("Listening on port 1337");
