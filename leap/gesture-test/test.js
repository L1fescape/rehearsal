var Leap = require('leapjs')
  , sys = require('sys')
  , exec = require('child_process').exec;

var controller = new Leap.Controller({enableGestures:true});
var acceptGesture = true;
function puts(error, stdout, stderr) { sys.puts(stdout); }


controller.on("frame", function(frame) {
  if (acceptGesture) {
    if (frame.gestures.length) {
      var gesture = frame.gestures[0];
      if (gesture.type == 'keyTap') {
        console.log("tap");
        exec("echo 'tap that bitch' | say 2>/dev/null", puts);
      acceptGesture = false;
      setTimeout(function() { acceptGesture = true; }, 1000);
      }
      else if (gesture.type == 'swipe') {
        exec("echo 'swipe me baby' | say 2>/dev/null", puts);
        console.log("swipe");
      acceptGesture = false;
      setTimeout(function() { acceptGesture = true; }, 1000);
      }

      // wait 1 second until registering another gesture.
      // reduces number of errors.
    }
  }
});



// init
controller.on('ready', function() { console.log("ready"); });
controller.connect();
console.log("\nWaiting for device to connect...");
