const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    intro:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('product', ProductSchema);