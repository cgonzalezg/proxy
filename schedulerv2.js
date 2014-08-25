var cron = require('cron');
var Promise = require( "es6-promise" ).Promise;
var tools = require('./tomcatPromise');
var services = []
var cronJob = cron.job("*/1 * * * * *", function(){
  tools.tomcat().then(function(val) {
    services = val
    console.log("shit"+service); // 1
  })


});

function getRoute (service_name) {
  var obj = response.filter(function ( service_name ) {
    return obj.name === name;
  })[0];
}

cronJob.start();
