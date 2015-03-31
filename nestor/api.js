'use strict';

var config = require('../config');
var request = require('request');

var api = function () {

    var rtm = function () {

        var start = function () {
            request.post('https://slack.com/api/rtm.start', {
                form: {
                    token: config.api_token
                }
            }, function (error, response, body) {
                console.log(response.statusCode);
                var payload = JSON.parse(body);

                var WebSocket = require('faye-websocket');
                var socket = new WebSocket.Client(payload.url);

                socket.on('open', function (event) {
                    console.log('opened socket');
                });

                socket.on('message', function (event) {
                    console.log(event.data);
                });
            });
        };

        return {
            'start': start
        };
    }();

    var users = function () {

        var setPresence = function (presence) {
            request.post('https://slack.com/api/users.setPresence', {
                form: {
                    token: config.api_token,
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

    }();

    var test = function () {

        request.post('https://slack.com/api/channels.join', {
            form: {
                token: config.api_token,
                name: 'the-artificial-lounge'
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            console.log(body);
        });
    };

    return {
        'rtm': rtm,
        'users': users,
        'test': test
    };

}();

module.exports = api;
