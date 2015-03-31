'use strict';

var config = require('../config');
var request = require('request');

var api = function () {

    var test = function () {

        request.post('https://slack.com/api/emoji.list', {
            form: {
                token: config.api_token
            }
        }, function (error, response, body) {
            console.log(response.statusCode);
            console.log(body);
        });
    };

    return {
        'test': test
    }

};

module.exports = new api;
