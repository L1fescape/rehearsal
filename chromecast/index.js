var ssdp = require('node-ssdp'),
    client = new ssdp({log: false}),
    http = require('http'),
    request = require('request'),
    parseString = require('xml2js').parseString;


var Chromecast = {
  device: {},

  discover: function() {
    // page 13 of these docs: https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGlhbC1tdWx0aXNjcmVlbi5vcmd8ZGlhbHxneDo1NTA2NDQ5MDZmMzdkNzI0
    client.search('urn:dial-multiscreen-org:service:dial:1');

    client.on('response', function inResponse(msg, rinfo) {
      this.onResponse(rinfo);
    }.bind(this));
  },

  onResponse: function(info) {
    // check if it's a chromecast
    var route = 'http://'+info.address+':8008/ssdp/device-desc.xml';
    request.get(route, function (error, resp, body) {
      if (!error && resp.statusCode == 200) {
        // parse XML result we get back
        parseString(body, function (err, result) {
          if (!err) {
            this.device = {
              address: resp.request.uri.hostname,
              name : result.root.device[0].friendlyName[0]
            }
          }
        }.bind(this));
      }
    }.bind(this)); 
  },

  youtube: function(command, video) {
    if (video)
      video = video.replace("http://www.youtube.com/watch?v=", "")
    
    if (command == "play") {
        var postData = "v=" + video,
          options = {
            host : this.device.address,
            port : 8008,
            path : "/apps/YouTube",
            method : "POST",
            headers : {
              'Content-Type': 'application/json',
              'Content-Length': postData.length
            }
          };

      var req = http.request(options, function(resp) {});
      req.on('error', function(e) {
        console.log(e);
      });
      req.write(postData);
      req.end();
    }

    else if (command == "stop") {
      var options = {
        host : this.device.address,
        port : 8008,
        path : "/apps/YouTube",
        method : "DELETE",
        headers : {
          'Content-Type': 'application/json',
        }
      };

      var req = http.request(options, function(resp) {});
      req.on('error', function(e) {
        console.log(e);
      });
      req.end();
    }

  }
};

module.exports = Chromecast;
