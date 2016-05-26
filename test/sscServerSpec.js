var SerialServoServer = require('../lib/ssc-server.js');
var sscServer = new SerialServoServer();

describe("serialservo-server has required methods", function () {
    var sscServer = new SerialServoServer();
    it("has a run function", function () {
        expect(sscServer.run).toBeDefined();
    });
    it("has a navHandler function", function () {
        expect(sscServer.navHandler).toBeDefined();
    });
});


describe("serialservo-server has required methods", function () {
    var sscServer, navCalled, mockSSC, mockResponse;

    beforeEach(function () {
        sscServer = new SerialServoServer();
        navCalled = false, timedNavCalled = false;
        mockSSC = {
            nav: function () {
                navCalled = true;
            }, timedNav: function () {
                timedNavCalled = true;
            }
        };
        mockResponse = {
            send: function (code, data) {
            }
        };
        sscServer.ssc = mockSSC;
    });

    it("navHandler sends to TimedNav if MS > 0", function () {
        var mockRequest = {
            params: {
                left: 0,
                right: 0,
                ms: 0
            }
        };
        sscServer.navHandler(mockRequest, mockResponse);
        expect(navCalled).toBe(true);
    });

    it("navHandler sends to TimedNav if MS > 0", function () {
        var mockRequest = {
            params: {
                left: 0,
                right: 0,
                ms: 100
            }
        };
        sscServer.navHandler(mockRequest, mockResponse);
        expect(timedNavCalled).toBe(true);
    });
});

