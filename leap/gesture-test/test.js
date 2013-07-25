var Leap = require('leapjs')
  , sys = require('sys')
  , exec = require('child_process').exec;

function swipeDirection(gesture) {
  var xdiff = gesture.startPosition[0] - gesture.position[0]
    , ydiff = gesture.startPosition[1] - gesture.position[1]
    , zdiff = gesture.startPosition[2] - gesture.position[2];

  var diffs = [
    { 
      distance : Math.abs(xdiff),
      coordinate : "x",
      type : (xdiff > 0) ? "left" : "right"
    },
    {
      distance : Math.abs(ydiff),
      coordinate : "y",
      type : (ydiff > 0) ? "down" : "up"
    },
    {
      distance : Math.abs(zdiff),
      coordinate : "z",
      type : (zdiff > 0) ? "forward" : "back"
    }    
  ];

  diffs.sort(function(a,b){return a['distance'] < b['distance'];});

  return diffs[0].type;
}




var controller = new Leap.Controller({enableGestures:true});
var acceptGesture = true;
function puts(error, stdout, stderr) { sys.puts(stdout); }


controller.on("frame", function(frame) {
  if (acceptGesture) {
    if (frame.gestures.length) {
      var gesture = frame.gestures[0];
      if (gesture.type == 'keyTap') {
        console.log("tap");
        acceptGesture = false;
      }
      else if (gesture.type == 'swipe') {
        var direction = swipeDirection(gesture);
        exec("echo 'swipe me " + direction + " baby' | say 2>/dev/null", puts);
        console.log("swipe", direction);
        acceptGesture = false;
      }

      // wait 1 second until registering another gesture.
      // reduces number of errors.
      if (!acceptGesture)
        setTimeout(function() { acceptGesture = true; }, 1000);
    }
  }
});



// init
controller.on('ready', function() { console.log("ready"); });
controller.connect();
console.log("\nWaiting for device to connect...");
