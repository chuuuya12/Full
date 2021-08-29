const moment = require('moment');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment().getTime().format()
    }
}

module.exports = formatMessage
