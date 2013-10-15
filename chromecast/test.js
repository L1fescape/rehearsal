var Chromecast = require("./")

Chromecast.discover();

setTimeout(function() {
  Chromecast.youtube("play", "http://www.youtube.com/watch?v=vN1hSCxOfNw");
  console.log(Chromecast.device)
  //Chromecast.youtube("stop");
}, 1000);
