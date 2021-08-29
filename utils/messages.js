const moment = require('moment');



function formatMessage(username,ucolor, text, time) {
    return {
        username,
        ucolor,
        text,
        time: moment(time).format('h:mm a')
    }
}

module.exports = formatMessage
