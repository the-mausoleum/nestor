'use strict';

var chat = require('../api/chat');

var handleMessage = function (message) {

    switch (message.type) {
        case 'message':
            if (message.text) {
                if (/@?nestor/gi.test(message.text)) {
                    chat.postMessage(message.channel, 'Hello, World!', {
                        as_user: true
                    });
                }
            }
            break;
        default:
    }

};

module.exports = handleMessage;
