"use strict";

var SerialServo = require("serialservo");
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var SerialServoServer = function (options) {
    var options = options || {};
    // express app
    this.app = options.app || express();
    this.httpPort = options.httpPort || 8080;
    this.loggingEnabled = options.loggingEnabled || true;
    this.staticDir = options.staticDir || "";
    this.apiDir = options.apiDir || "/api";
    this.ssc = new SerialServo(options);
    this.app.ssc = this.ssc; // set in app so it can be accessed via handler
    this.init();
};

SerialServoServer.prototype.init = function () {
    var self = this;
    // boilerplate for cors/json/etc
    this.app.use(cors()); // cors
    this.app.use(bodyParser.json()); // for parsing application/json
    this.app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    // routes
    this.app.get('/api/move/:pin/:pos', function (req, res) {
        self.moveHandler(req, res);
    });
    this.app.get('/api/nav/:left/:right', function (req, res) {
        self.navHandler(req, res);
    });
    this.app.get('/api/nav/:left/:right/:ms', function (req, res) {
        self.navHandler(req, res);
    });

    // optional
    if (this.staticDir != "") {
        this.app.use('/', express.static(this.staticDir));
    }

};

SerialServoServer.prototype.run = function () {
    this.app.listen(this.httpPort);
    console.log('serial servo server app started on  ' + this.httpPort);
};

SerialServoServer.prototype.moveHandler = function (req, res) {
    var pin = req.params.pin;
    var pos = req.params.pos;
    if (pin >= 0 && pin <= 7 && pos >= 0 && pos <= 255) {
        this.ssc.move(pin, pos);
        res.status(200).send({success: 'moved the ssc', message: 'moved pin:' + pin + ', pos:' + pos});
    } else {
        res.send(500);
    }
}

SerialServoServer.prototype.navHandler = function (req, res) {
    var left = req.params.left;
    var right = req.params.right;
    var ms = req.params.ms || 0;
    if (left >= 0 && left <= 255 && right >= 0 && right <= 255) {
        if (ms > 0 && ms <= 10000) {
            this.ssc.timedNav(left, right, ms);
            res.status(200).send({success: 'timed navigation moved the ssc'});
        } else {
            this.ssc.nav(left, right);
            res.status(200).send({success: 'navigation moved the ssc'});
        }
    } else {
        res.send(500);
    }
}

module.exports = SerialServoServer;