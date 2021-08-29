const moment = require('moment');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: new Date().getTime()
    }
}

module.exports = formatMessage
