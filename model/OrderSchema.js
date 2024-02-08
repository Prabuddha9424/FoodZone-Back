const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    userData:{
        type:Object,
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
    price:{
        type:Number,
        required:true
    },
});
module.exports = mongoose.model('order',OrderSchema);