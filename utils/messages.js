const moment = require('moment');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment-timezone().format('h:mm:a')	
    }
}

module.exports = formatMessage
