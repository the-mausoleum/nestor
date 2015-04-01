'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var WebSocket = require('faye-websocket');

var auth = require('./nestor/api/auth');
var users = require('./nestor/api/users');
var rtm = require('./nestor/api/rtm');

var handleMessage = require('./nestor/handlers/message');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    process.env.token = require('./config').api_token;

    auth.test().then(function (data) {
        process.env.team_id = data.team_id;
        process.env.user_id = data.user_id

        users.setPresence('auto').then(function (data) {
            rtm.start().then(function (data) {
                var socket = new WebSocket.Client(data.url);

                socket.on('open', function (event) {
                    console.log('opened socket');
                });

                socket.on('message', function (event) {
                    var message = JSON.parse(event.data);

                    handleMessage(message);
                });
            });
        });
    });

    console.log('Nestor listening on port ' + server.address().port);
});
