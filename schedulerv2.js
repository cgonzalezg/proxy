var cron = require('cron');
var tools = require('./tomcat');
var response =[];
var cronJob = cron.job("*/1 * * * * *", function(){
  response = []
  var res = tools.tomcat('localhost', response);
  console.log("Sevice name Scheduler ->" + JSON.stringify(res, null, 4));
  console.log("Sevice name Scheduler ->" + res);
});
//console.log("Sevice name Scheduler ->" + JSON.stringify(getRoute('/usr/share/tomcat7-admin/manager'), null, 4));




function getRoute (service_name) {
  var obj = response.filter(function ( service_name ) {
    return obj.name === name;
  })[0];
}

cronJob.start();
