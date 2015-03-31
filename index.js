'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var api = require('./nestor/api');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    api.rtm.start();

    console.log('Nestor listening on port ' + server.address().port);
});
