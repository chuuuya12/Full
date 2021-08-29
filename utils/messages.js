const generateMessage= (username,msg)=>{

    return {
        username,
        ucolor,
        text,
        time: new Date().getTime()
    }

}
module.exports = generateMessage
