var Leap = require('leapjs')
  , controller = new Leap.Controller({enableGestures:true})
  , direction = require('./gesture-direction')


controller.on("frame", function(frame) {
  if (frame.gestures.length) {
    var gesture = frame.gestures[0];
    if (gesture.type == 'keyTap') {
      console.log("tap");
    }
    else if (gesture.type == 'swipe') {
      console.log("swipe", direction.swipe(gesture));
    }
    else if (gesture.type == 'circle') {
      console.log("circle", direction.circle(gesture));
    }
  }
});


// init
controller.on('ready', function() { console.log("ready"); });
controller.connect();
console.log("\nWaiting for device to connect...");
