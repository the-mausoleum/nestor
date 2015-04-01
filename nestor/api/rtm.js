'use strict';

var q = require('q');
var request = require('request');

var start = function () {
    var deferred = q.defer();

    request.post('https://slack.com/api/rtm.start', {
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
    'start': start
};
