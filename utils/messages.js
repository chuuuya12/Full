const generateMessage= (username,msg)=>{

    return {
    username,
    text: msg,
    createdAt: new currentDate().getTime('h:mm: a')
    }

}

module.exports= {
    
    generateMessage


}
