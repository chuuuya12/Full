const moment = require('moment-timezone');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment(1369266934311).tz('America/Phoenix').format('h:mm:a')
    }
}

module.exports = formatMessage
