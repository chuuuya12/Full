const moment = require('moment');

function moment() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = ( secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
}

function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment().format('h:mm:ss')
    }
}

module.exports = formatMessage
