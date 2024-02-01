const mongoose = require('mongoose');
const ProductSchema = new mongoose({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('product', ProductSchema);