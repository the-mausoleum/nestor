'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var auth = require('./nestor/api/auth');
var rtm = require('./nestor/api/rtm');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    process.env.token = require('./config').api_token;

    auth.test().then(function (data) {
        process.env.team_id = data.team_id;
        process.env.user_id = data.user_id

        rtm.start();
    });

    console.log('Nestor listening on port ' + server.address().port);
});
