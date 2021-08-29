const moment = require('moment');



function formatMessage(username,ucolor, text, time) {
    return {
        username,
        ucolor,
        text,
        time: moment().format()
    }
}

module.exports = formatMessage
