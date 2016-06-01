var SerialServoServer = require('../../lib/ssc-server.js');

describe("the server should do the following things", function () {

    var app = {
        listen: function () {
        }
    };

    it("should have an init method", function () {
        // covers no options brange for 100% coverage
        var sscServer = new SerialServoServer();
        expect(sscServer.init).toBeDefined();
    });

    it("should call listen when ran", function () {
        //arrange
        var sscServer = new SerialServoServer({expressApp: app, httpPort: 3000});
        spyOn(sscServer.app, 'listen');

        //act
        sscServer.run();

        //assert
        expect(sscServer.app.listen).toHaveBeenCalledWith(3000);
        // expect(console.log).toHaveBeenCalled();
    });

    it("should call ssc.move with good parameters when ran", function () {
        //arrange
        var ssc = {
            move: function (pin, pos) {
            }
        };
        var req = {params: {pin: 1, pos: 2}};
        var res = {
            status: function () {
                return {
                    send: function () {
                    }
                };
            },
            send: function () {
            }
        };
        var sscServer = new SerialServoServer({expressApp: app, staticDir: "something", httpPort: 3000});
        spyOn(sscServer.ssc, 'move');

        //act
        sscServer.moveHandler(req, res);

        //assert
        expect(sscServer.ssc.move).toHaveBeenCalledWith(1, 2);

    });
    it("should throw a 500 with bad parameters when ran", function () {
        //arrange
        var ssc = {
            move: function (pin, pos) {
            }
        };
        var req = {params: {pin: 8, pos: 256}};
        var res = {
            status: function () {
                return {
                    send: function () {
                    }
                };
            },
            send: function () {
            }
        };
        var sscServer = new SerialServoServer({expressApp: app, staticDir: "something", httpPort: 3000});
        spyOn(res, 'send');

        //act
        sscServer.moveHandler(req, res);

        //assert
        expect(res.send).toHaveBeenCalledWith(500);

    });

    it("should call ssc.nav with good parameters when ran", function () {
        //arrange
        var ssc = {
            nav: function (left, right) {
            }
        };
        var req = {params: {left: 100, right: 100}};
        var res = {
            status: function () {
                return {
                    send: function () {
                    }
                };
            },
            send: function () {
            }
        };
        var sscServer = new SerialServoServer({expressApp: app, httpPort: 3000});
        spyOn(sscServer.ssc, 'nav');

        //act
        sscServer.navHandler(req, res);

        //assert
        expect(sscServer.ssc.nav).toHaveBeenCalledWith(100, 100);

    });
    it("should call ssc.timedNav with good parameters when ran", function () {
        //arrange
        var ssc = {
            nav: function (left, right) {
            }
        };
        var req = {params: {left: 100, right: 100, ms: 1000}};
        var res = {
            status: function () {
                return {
                    send: function () {
                    }
                };
            },
            send: function () {
            }
        };
        var sscServer = new SerialServoServer({expressApp: app, httpPort: 3000});
        spyOn(sscServer.ssc, 'timedNav');

        //act
        sscServer.navHandler(req, res);

        //assert
        expect(sscServer.ssc.timedNav).toHaveBeenCalledWith(100, 100, 1000);

    });

    it("should throw a 500 with bad parameters when on nav", function () {
        //arrange
        var ssc = {
            move: function (pin, pos) {
            }
        };
        var req = {params: {left: 256, right: 100, ms: 1000}};
        var res = {
            status: function () {
                return {
                    send: function () {
                    }
                };
            },
            send: function () {
            }
        };
        var sscServer = new SerialServoServer({expressApp: app, staticDir: "something"});
        spyOn(res, 'send');

        //act
        sscServer.navHandler(req, res);

        //assert
        expect(res.send).toHaveBeenCalledWith(500);

    });
});

