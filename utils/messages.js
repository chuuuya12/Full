const generateMessage= (username,msg)=>{

    return {
    username,
    text: msg,
    createdAt: new Date().getTime().moment()
    }

}

module.exports= {
    
    generateMessage


}
