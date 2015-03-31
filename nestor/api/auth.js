'use strict';

var q = require('q');
var request = require('request');

var test = function (channel, text, options) {
    var deferred = q.defer();

    request.post('https://slack.com/api/auth.test', {
        form: {
            token: process.env.token
        }
    }, function (error, response, body) {
        if (response.statusCode === 200) {
            deferred.resolve(JSON.parse(body));
        }

        deferred.reject(error);
    });

    return deferred.promise;
};

module.exports = {
    'test': test
};
