'use strict';

var util = require('util');

var chat = require('../api/chat');

var handleMessage = function (message) {

    console.log(message);

    switch (message.type) {
        case 'message':
            if (message.text) {
                if (/@?nestor/gi.test(message.text)) {
                    if (/hello|hi|xoka/i.test(message.text)) {
                        chat.postMessage(message.channel, util.format('Good day, <@%s>!', message.user), {
                            as_user: true
                        });
                    }
                }
            }
            break;
        default:
    }

};

module.exports = handleMessage;
