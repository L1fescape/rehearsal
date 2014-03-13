var 

  // expressjs
  express = require('express'),
  app = express(),

  // http server
  http = require('http'),
  httpServer = http.createServer(app),

  directory = "/test",
  port = 9000;

// configure the server
app.configure(function() {
  var dir = __dirname.split("/");
  // pop off directories to get access to parent directories. repeat as needed. 
  dir.pop();
  // directory to look for static files
  app.use(express.static(dir.join("/") + directory));
});

// run the server
httpServer.listen(port);
console.log("Listening on port", port);
