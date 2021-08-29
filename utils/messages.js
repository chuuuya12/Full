const generateMessage= (username,msg)=>{

    return {
    username,
    text: msg,
    createdAt: new Date().getTime().format('h:mm: a')
    }

}

module.exports= {
    
    generateMessage


}
