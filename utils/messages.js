const moment = require('moment-timezone');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment.tz().format('h:mm:ss')
    }
}

module.exports = formatMessage
