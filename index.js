/*
* express
* mongoose
* nodemon -g
* dotenv
* body-parser
* bcrypt
* jsonwebtoken
* nodemailer
*/
const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const port= process.env.SERVER_PORT | 3000;
const app = express();

const userRoute= require('./routes/UserRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/foodzone').then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
}).catch(err=>{
    console.log(err.message);
})
app.get('/test-api',(req, res)=>{
    return res.json({'message':'server started!'});
})

app.use('/api/v1/users',userRoute);