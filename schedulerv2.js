var cron = require('cron');
var Promise = require( "es6-promise" ).Promise;
var tools = require('./tomcatPromise');
var readline = require('readline');
var services = []
var cronJob = cron.job("*/1 * * * * *", function(){
  tools.tomcat().then(function(val) {
    services = val
    //  console.log(service); // 1
  })
});
module.exports = {
  start: function() {

    return cronJob.start();

  },
  proxy_routes: function(){
    return services
  }
}

function search(nameKey){
    for (i = 0; i < services.length; i++) {
        if (services[i].name === nameKey) {
            return services[i];
        }
    }
}

cronJob.start();
console.log(services)
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Which service you want to check ", function(answer) {
  // TODO: Log the answer in a database
  var result = search(answer, services)
  console.log("Thank you for your valuable feedback:", result);

  if (result != null){
    console.log("localhost")
  }else {
    console.log("staging")
  }


  rl.close();
});
