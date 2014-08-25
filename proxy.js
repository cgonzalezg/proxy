var http = require('http'),
    httpProxy = require('http-proxy');
var cron = require('cron');
var tools = require('./tomcatPromise');
var services = []
var cronJob = cron.job("*/1 * * * * *", function(){
  tools.tomcat().then(function(val) {
    services = val
  })
});

function search(nameKey, arrayList){
    for (i = 0; i < arrayList.length; i++) {
        if (arrayList[i].name === nameKey) {
            return arrayList[i];
        }
    }
}

cronJob.start();

var proxy = httpProxy.createProxyServer({});

var server = require('http').createServer(function(req, res) {
  var concant = "/"+req.url.split('/')[1]
  var route = search(concant, services)
  console.log(services)
  if (route != null){
    proxy.web(req, res, { target: 'http://localhost:8080' });
  } else {
    proxy.web(req, res, { target: 'http://www.google.es' });
  }


});

console.log("listening on port 5050")
server.listen(5050);
