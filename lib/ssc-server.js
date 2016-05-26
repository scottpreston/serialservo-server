"use strict";

var SerialServo = require("serialservo");
var restify = require('restify');
var errors = require('restify-errors');

var SerialServoServer = function (options) {
    var options = options || {};

    this.httpPort = options.httpPort || 8080;
    this.loggingEnabled = options.loggingEnabled || true;
    this.ssc = new SerialServo(options);
}

SerialServoServer.prototype.run = function () {
    var server = restify.createServer({
        name: 'serialservo-server',
        version: '0.0.2'
    });

    server.use(restify.CORS());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/move/:pin/:pos', function (req, res) {
        var pin = req.params.pin;
        var pos = req.params.pos;
        if (pin >= 0 && pin <= 7 && pos >= 0 && pos <= 255) {
            self.ssc.move(pin, pos);
            res.send(200, {message: 'moved pin:' + pin + ', pos:' + pos});
        } else {
            res.send(500);
        }
    });

    server.get('/nav/:left/:right', this.navHandler);

    server.get('/nav/:left/:right/:ms', this.navHandler);

    server.listen(self.httpPort, function () {
        console.log('%s listening at %s', server.name, server.url);
    });

}

SerialServoServer.prototype.navHandler = function navHandler(req, res) {
    var self = this;
    var left = req.params.left;
    var right = req.params.right;
    var ms = req.params.ms || 0;
    if (left >= 0 && left <= 255 && right >= 0 && right <= 255) {
        if (ms > 0) {
            self.ssc.timedNav(left, right, ms);
        } else {
            self.ssc.nav(left, right);
        }
        res.send(200, {success: 'moved the ssc'});
    } else {
        res.send(new errors.InternalServerError({message: 'enter correct values for navigation'}));
    }
}

module.exports = SerialServoServer;