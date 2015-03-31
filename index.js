'use strict';

var config = require('./config');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        var api = require('./nestor/api');

        api.test();
    });

app.use('/', router);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Nestor listening on port ' + server.address().port);
});
