var SerialServoServer = require('../lib/ssc-server.js');
var sscServer = new SerialServoServer({staticDir: __dirname + '/public'});
sscServer.run();