var SerialServoController = require("../lib/ssc.js");

describe("serial servo controller with no options has default values", function () {
    var ssc = new SerialServoController();
    it("ssc should have logging enabled by default", function () {
        expect(ssc.loggingEnabled).toBe(true);
    });
});

describe("serial controller move functionality", function () {
    var ssc = new SerialServoController();
    it("should pass specific bytes to the serial port", function () {
        spyOn(ssc.serialPort, 'write');
        ssc.move(1, 2);
        expect(ssc.serialPort.write).toHaveBeenCalledWith([255, 1, 2]);
    });
});

describe("serial controller nav functionality", function () {
    var ssc = new SerialServoController();
    it("should pass specific bytes to the serial port", function () {
        spyOn(ssc, 'move');
        ssc.nav(1, 1);
        expect(ssc.move.calls.length).toEqual(2);
    });
});

describe("serial controller timed move functionality", function () {
    var ssc = new SerialServoController();
    it("call move twice", function () {
        jasmine.Clock.useMock();
        spyOn(ssc, 'move');
        ssc.timedMove(1, 1, 50);
        jasmine.Clock.tick(100);
        expect(ssc.move.calls.length).toEqual(2);

    });
});

describe("serial controller timed navigation functionality", function () {
    var ssc = new SerialServoController();
    it("should call move 4 times", function () {
        jasmine.Clock.useMock();
        spyOn(ssc, 'move');
        ssc.timedNav(1, 1, 50);
        jasmine.Clock.tick(100);
        expect(ssc.move.calls.length).toEqual(4);

    });
});
