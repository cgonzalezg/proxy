var http = require('http');
var Promise = require( "es6-promise" ).Promise;
var StringDecoder = require('string_decoder').StringDecoder;
module.exports = {
  tomcat: function () {
    return new Promise(function (resolve, reject) {

        // perform operation e.g. GET request http.get() etc.
      var options = {
        host: 'localhost',
        port: 8080,
        path: '/manager/text/list',
        auth: 'admin:password'
      };
      http.get(options, function(res) {
        // console.log("Got response: " + res.statusCode);
        var decoder = new StringDecoder('utf8');
        var data = []
          res.on("data", function(chunk) {
            var textChunk = decoder.write(chunk);
            var services = textChunk.split('\n')
            services.forEach(function(sevice){
              var serviceName = {'name': sevice.split(':')[0]}
              //console.log("push",serviceName)
              data.push(serviceName)
            });

          }).on('end', function() {
            //  console.log(data);
            resolve(data)
          }).on('error', function(e) {
            console.log("Got error: " + e.message);
            reject(e)
          })
      });
    })
  }
}
