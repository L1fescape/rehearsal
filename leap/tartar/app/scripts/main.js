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
    },
    cornify: {
      exports: 'cornify'
    }
  },
  paths: {
    jquery: '../libs/jquery/jquery',
    backbone: '../libs/backbone-amd/backbone',
    underscore: '../libs/underscore-amd/underscore',
    leap: '../libs/leapjs/leap',
    cornify: '../libs/cornify/cornify',
  }
});

require([
    'backbone', 'leap', 'cornify'
], function (Backbone, _leap, _cornify) {
  // Create loop
  Leap.loop(function(frame) {
    // clear canvas
    if (frame.fingers.length)
      cornify.add();
  });
});
