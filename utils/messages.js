const moment = require('moment');



function formatMessage(username,ucolor, text, time) {
    return {
        username,
        ucolor,
        text,
        time: Intl.DateTimeFormat('h:mm:a').resolvedOptions().timeZone
    }
}

module.exports = formatMessage
