const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
    product:{
        type:Array,
        required:true
    },
    customerDetails:{
        type:Object,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    token:{
        type:String,
        required:true
    },
});
module.exports = mongoose.model('order',OrderSchema);