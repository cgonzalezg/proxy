var cron = require('cron');
var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;
var response =[];
var cronJob = cron.job("*/3 * * * * *", function(){

  var options = {
    host: 'localhost',
    port: 8080,
    path: '/manager/text/list',
    auth: 'admin:password'
  };

  http.get(options, function(res) {
    console.log("Got response: " + res.statusCode);
    var decoder = new StringDecoder('utf8');

    res.on("data", function(chunk) {
      var textChunk = decoder.write(chunk);
      var services = textChunk.split('\n')
      var serviceNames = services.map(function(sevice){
        var serviceName = sevice.split(':')[3]
        console.log("push",serviceName)
        response.push(serviceName)
      });

    }).on('end', function() {
      console.log("Sevice name ->" + JSON.stringify(response, null, 4));

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    })
  });
    //console.info(response);
    console.info('cron job completed');
});
console.log("Sevice name ->" + JSON.stringify(response, null, 4));
cronJob.start();
