const verify = require('../Utils/ValidateToken');
const router = require('express').Router()
const valid = require('@hapi/joi')
const notesModel = require('../Model/Notes')
const notesSchema = valid.object({
    title :valid.string().min(6).required(),
    data:valid.string().min(6).required(),
    user  :valid.required()
}); 
router.post('/all' , verify , async(req , res)=>{
  
    notesModel.find({user:req.body.user} , async(err , data)=>{
        const  notes = {
            "error":false ,
            "records":data
        }
        await  res.send(notes).status(400) ; 
    });
  
   
   

}) ; 
router.post('/' , verify , (req , res)=>{
    const {error}  =notesSchema.validate(req.body);
    if(error) return  res.send(error).status(400) ; 
    try{
        // const user = new userModel({
        //     name:req.body.name , 
        //     email:req.body.email , 
        //     password:hash
        // });
        const notes = new notesModel({
            title:req.body.title , 
            data :req.body.data , 
            user :req.body.user
        }) ;
       notes.save().then(result=>{
        console.log(result);
        res.status(200).send(result) ;
        
       }) ; 
    }catch(err){
        console.log("Error while inserting new Notes" , err);
        
    }
}) ; 

module.exports= router;