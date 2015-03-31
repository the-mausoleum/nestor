'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var rtm = require('./nestor/api/rtm');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    process.env.token = require('./config').api_token;

    rtm.start();

    console.log('Nestor listening on port ' + server.address().port);
});
