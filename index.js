const express = require('express')
const dotenv = require('dotenv')
const bodyParser  = require('body-parser')
//import route
const authRouter  = require('./Routes/auth') ; 
const notesRouter = require('./Routes/notes')
const mongoose = require('mongoose')

//start express server
const app =express(); 
dotenv.config();
const PORT  = process.env.PORT || 3000 ; 

//Connection to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser:true ,
     useUnifiedTopology:true},()=>{
    console.log("Connected to DB" );  
}) ; 
//Middle ware
app.use(bodyParser.urlencoded({
    extended:false,
})) ;
app.use(bodyParser.json());

app.use('/api/user/' , authRouter) ; 
app.use('/api/notes/' ,notesRouter );


app.listen(PORT , ()=>{
    console.log(`Server runnig at ${PORT}`);  
});
