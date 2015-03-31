'use strict';

var request = require('request');

var setPresence = function (presence) {
    request.post('https://slack.com/api/users.setPresence', {
        form: {
            token: process.env.token,
            presence: presence
        }
    }, function (error, response, body) {
        console.log(response.statusCode);
        console.log(body);
    });
};

return {
    'setPresence': setPresence
};
