const router = require('express').Router()
const userModel = require('../Model/User')
const valid = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerSchema = valid.object({
    name :valid.string().min(6).required(),
    email:valid.string().min(6).required().email(),
    password:valid.string().min(6).required ()
}); 
const loginSchema  = valid.object({
    email:valid.string().min(6).required().email() , 
    password:valid.string().min(6).required()
});

router.post('/register' ,async (req , res )=>{
 //validate the data
 try{
    const {error} = registerSchema.validate(req.body);
    console.log(req.body);
    
    if(error) return  res.send(error).status(400) ; 
    const emailExist  = await userModel.findOne({email:req.body.email}) ; 
    if(emailExist) return res.send("Email already exist").status(400); 
    var salt = await bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const user = new userModel({
        name:req.body.name , 
        email:req.body.email , 
        password:hash
    });
    try{
        user.save().then(result=>{
            res.status(200).send(result.name) ; 
        });
    }catch(err){
        console.log(err);
        
    }

 }catch(err){
     console.log("Register error"  , err);
     
 }
 
}) ; 
router.post('/login' , async(req , res)=>{
    //login handle here
    // res.send(200).json("name:hello");

    const {error} = await loginSchema.validate(req.body);
    if(error) return  res.send(error.details[0].message).status(400) ; 
    const emailExist  = await userModel.findOne({email:req.body.email}) ; 
    if(!emailExist) return res.send("Invalid Request").status(400); 
    try{
        const validPass = await bcrypt.compare(req.body.password ,
            emailExist.password)  ; 
       if(!validPass) return res.send("Invalid Login") .status(400) ; 
        const token = jwt.sign({_id:emailExist._id} , process.env.TOKEN_SECRET);
       res.header('auth-token' ,token).send(token);
       }catch(err){
           console.log(err);   
       }
}) ; 


module.exports= router;