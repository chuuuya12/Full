const generateMessage= (username,ucolor, text)=>{

    return {
    username,
    ucolor,
    text,
    createdAt: new Date().getTime()
    }

}

module.exports= {
    
    generateMessage


}
