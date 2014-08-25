var http = require('http'),
    httpProxy = require('http-proxy');

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 1;

var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
    res = http.get({host:'http://localhost:8080',path:'/manager/text/list'});
    console.log(res)
});



//var proxyEntries = [{ "name":"1" "server":"localhost:1111" }, { "name":"2" "server":"localhost:2222" }]
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = require('http').createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  proxy.web(req, res, { target: 'http://www.google.es' });
});

console.log("listening on port 5050")
server.listen(5050);