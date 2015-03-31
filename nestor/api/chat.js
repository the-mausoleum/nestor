'use strict';

var request = require('request');

var postMessage = function (channel, text, options) {
    request.post('https://slack.com/api/chat.postMessage', {
        form: {
            token: process.env.token,
            channel: channel,
            text: text,
            as_user: options.as_user
        }
    }, function (error, response, body) {
        console.log(response.statusCode);
        console.log(body);
    });
};

module.exports = {
    'postMessage': postMessage
};
