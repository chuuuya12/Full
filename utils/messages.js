const moment = require('moment');



function formatMessage(username,ucolor, text) {
    return {
        username,
        character,
        ucolor,
        text,
        time: moment().format('h:mm:a')
    }
}

module.exports = formatMessage
