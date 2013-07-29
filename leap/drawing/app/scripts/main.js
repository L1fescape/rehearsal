/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    leap: {
      exports: 'leap'
    }
  },
  paths: {
    jquery: '../libs/jquery/jquery',
    backbone: '../libs/backbone-amd/backbone',
    underscore: '../libs/underscore-amd/underscore',
    leap: '../libs/leapjs/leap',
  }
});

require([
    'backbone', 'leap'
], function (Backbone, _leap) {
  // Grab canvas and ctx
  var canvas = $("#canvas").get(0)
    , ctx = canvas.getContext('2d')
    , width = 600
    , height = 500;

  // Create loop
  Leap.loop(function(frame) {
    // clear canvas
    if (frame.fingers.length > 2)
      ctx.clearRect( 0, 0, width, height);

    ctx.fillStyle="#FF0000";
    if (frame.fingers.length) {
      for (var i = 0, j = frame.fingers.length; i < j; i++) {
        var finger = frame.fingers[i]
          , x = finger.tipPosition[0] + width/2
          , y = finger.tipPosition[2] + height/2

        ctx.fillRect(x, y, 10, 10);
      }
    }
  });
});
