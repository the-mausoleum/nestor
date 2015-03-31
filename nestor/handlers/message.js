'use strict';

var util = require('util');

var chat = require('../api/chat');

var handleMessage = function (message) {

    console.log(message);

    if (process.env.user_id === message.user) {
        return;
    }

    switch (message.type) {
        case 'message':
            var targeted = new RegExp(util.format('(^<@%s>)|(^nestor)', process.env.user_id), 'i')

            if (targeted.test(message.text)) {
                if (/hello|hi|xoka/i.test(message.text)) {
                    return chat.postMessage(message.channel, util.format('Good day, <@%s>!', message.user), {
                        as_user: true
                    });
                }

                if (/goodbye|bye|xopa/i.test(message.text)) {
                    return chat.postMessage(message.channel, util.format('Farewell, <@%s>!', message.user), {
                        as_user: true
                    });
                }

                return chat.postMessage(message.channel, util.format('I\'m not quite sure what to tell you, <@%s>.', message.user), {
                    as_user: true
                });
                break;
            }
        default:
    }

};

module.exports = handleMessage;
