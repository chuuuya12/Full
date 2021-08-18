const moment = require('moment-timezone');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment(new Date({your_date})).zone("+08:00").format('h:mm:a')
    }
}

module.exports = formatMessage
