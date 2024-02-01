const mongoose=require('mongoose');
const CustomerSchema=new mongoose({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
});
module.exports = mongoose.model('customer',CustomerSchema);