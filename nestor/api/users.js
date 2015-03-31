'use strict';

var q = require('q');
var request = require('request');

var setPresence = function (presence) {
    var deferred = q.defer();

    request.post('https://slack.com/api/users.setPresence', {
        form: {
            token: process.env.token,
            presence: presence
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
    'setPresence': setPresence
};
