var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
var servicesNames = []
module.exports = {
  tomcat: function(hostName,response){
      // perform operation e.g. GET request http.get() etc.
    var options = {
      host: hostName,
      port: 8080,
      path: '/manager/text/list',
      auth: 'admin:password'
    };
    var output = []
    http.get(options, function(res) {
      console.log("Got response: " + res.statusCode);
      var decoder = new StringDecoder('utf8');
      var data = []
      res.on('response', function(response){
        res.on("data", function(chunk) {
          var textChunk = decoder.write(chunk);
          var services = textChunk.split('\n')
          var serviceNames = services.map(function(sevice){
            var serviceName = {'name': sevice.split(':')[3]}
            //console.log("push",serviceName)
            data.push(serviceName)
          });

        }).on('end', function() {
       //console.log("Sevice name data ->" + JSON.stringify(data, null, 4));
        //res.end(response.join(''));
          var result = data
          console.log("Sevice name data ->" + result);
          return result


        }).on('error', function(e) {
          console.log("Got error: " + e.message);
        })
      });
    });

      //console.info(response);
      console.log("Sevice name ouput->" + output);
      return output
  }
}
