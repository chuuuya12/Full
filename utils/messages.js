  
const formatMessage= (username,ucolor, text)=>{

    return {
        username,
        ucolor,
        text,
    time: new Date().getTime('h:mm:a')
    }

}
module.exports = formatMessage
