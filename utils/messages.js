const moment = require('moment-timezone');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: utc().format('h:mm:ss') // 2013-11-18T03:55Z
    }
}

module.exports = formatMessage
