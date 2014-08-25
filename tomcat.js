var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
var servicesNames = []
module.exports = {
  tomcat: function(hostName,response, callback){
      // perform operation e.g. GET request http.get() etc.
    var options = {
      host: hostName,
      port: 8080,
      path: '/manager/text/list',
      auth: 'tomcat:tomcat'
    };
    var output = []
    http.get(options, function(res) {
      console.log("Got response: " + res.statusCode);
      var decoder = new StringDecoder('utf8');
      var data = []
        res.on("data", function(chunk) {
          var textChunk = decoder.write(chunk);
          var services = textChunk.split('\n')
          services.forEach(function(sevice){
            var serviceName = {'name': sevice.split(':')[3]}
            //console.log("push",serviceName)
            data.push(serviceName)
          });

        }).on('end', function() {
          // console.log(data);
          callback(data)
        }).on('error', function(e) {
          console.log("Got error: " + e.message);
        })
    });
  }
}
