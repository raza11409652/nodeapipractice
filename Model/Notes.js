const mongoose = require('mongoose')
const notesSchema = mongoose.Schema({
    title : {
        type:String , 
        required:true ,
        min:4 

    } ,
    date:{
        type:Date , 
        default :Date.now
    },
    data:{
        type:String , 
        required:true , 
    } , 
    user:{
        type:mongoose.Schema.ObjectId,
        required:true ,
    }
    
}) ; 
module.exports = mongoose.model('Notes' , notesSchema);