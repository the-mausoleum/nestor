'use strict';

var request = require('request');

var handleMessage = require('../handlers/message');

var start = function () {
    request.post('https://slack.com/api/rtm.start', {
        form: {
            token: process.env.token
        }
    }, function (error, response, body) {
        if (response.statusCode !== 200) {
            throw body;
        }

        var payload = JSON.parse(body);

        var WebSocket = require('faye-websocket');
        var socket = new WebSocket.Client(payload.url);

        socket.on('open', function (event) {
            console.log('opened socket');
        });

        socket.on('message', function (event) {
            var message = JSON.parse(event.data);

            handleMessage(message);
        });
    });
};

module.exports = {
    'start': start
};
