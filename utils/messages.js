const generateMessage= (username,msg)=>{

    return {
    username,
    text: msg,
    createdAt: new currentDate().getTime()
    }

}

module.exports= {
    
    generateMessage


}
