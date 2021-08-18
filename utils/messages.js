const moment = require('moment');



function formatMessage(username,ucolor, text) {
    return {
        username,
        ucolor,
        text,
        time: moment().format('h:mm:a')
    }
}

let generatedLocationMessage = (from, lat, lng) => {
    return {
        from, 
        url: `https://www.google.com/maps?q=${lat}, ${lng}`,
        createAt: new Date().getTime()
    }
}

module.exports = {formatMessage, generatedLocationMessage};
