describe('serial servo api test suite', function () {

    var request = require('request');
    var BASE_URL = 'http://localhost:8080';

    it("/ should return an html file", function (done) {
        // arrange
        request
            .get(BASE_URL + '/', function (error, response, body) {
                if (error) {
                    expect(false).toBeTruthy();
                    done();
                }
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toBe("text/html; charset=UTF-8");
                done();
            });

    });
    it("/api/move/0/100 should return success", function (done) {
        // arrange
        request
            .get(BASE_URL + '/api/move/0/100', function (error, response, body) {
                if (error) {
                    expect(false).toBeTruthy();
                    done();
                }
                expect(response.statusCode).toBe(200);
                var jsonBody = JSON.parse(body);
                expect(jsonBody.success).toBeDefined();
                done();
            });
    });

    it("/api/move/8/256 should return error", function (done) {
        // arrange
        request
            .get(BASE_URL + '/api/move/8/256', function (error, response, body) {
                if (error) {
                    expect(false).toBeTruthy();
                    done();
                }
                expect(response.statusCode).toBe(500);
                done();
            });
    });
    it("/api/nav/100/100 should return success", function (done) {
        // arrange
        request
            .get(BASE_URL + '/api/nav/100/100', function (error, response, body) {
                if (error) {
                    expect(false).toBeTruthy();
                    done();
                }
                expect(response.statusCode).toBe(200);
                var jsonBody = JSON.parse(body);
                expect(jsonBody.success).toBeDefined();
                done();
            });
    });

    it("/api/nav/100/100/1000 should return success", function (done) {
        // arrange
        request
            .get(BASE_URL + '/api/nav/100/100/1000', function (error, response, body) {
                if (error) {
                    expect(false).toBeTruthy();
                    done();
                }
                expect(response.statusCode).toBe(200);
                var jsonBody = JSON.parse(body);
                expect(jsonBody.success).toBeDefined();
                done();
            });
    });


});