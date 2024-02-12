const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    payStatus:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
});
module.exports = mongoose.model('order',OrderSchema);