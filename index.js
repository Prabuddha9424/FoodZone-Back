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
const cors = require('cors')

const userRoute= require('./routes/UserRoute');
const customerRoute= require('./routes/CustomerRoute');
const productRoute= require('./routes/ProductRoute');
const orderRoute= require('./routes/OrderRoute');
const adminRoute=require('./routes/AdminUserRoute')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

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
app.use('/api/v1/customers',customerRoute);
app.use('/api/v1/products',productRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/admin',adminRoute);