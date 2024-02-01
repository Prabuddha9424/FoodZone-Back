const ProductSchema = require('../model/ProductSchema');
const CustomerSchema = require("../model/CustomerSchema");

const create=(req, res)=>{
    const customer= new ProductSchema({
        name:req.body.name,
        price:req.body.price,
        qty:req.body.qty,
        image:req.body.image
    });
    customer.save().then(customer=>{
        return res.status(200).json({'message':'Product Saved'});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
const findById=(req, res)=>{
    ProductSchema.findOne({'_id': req.params.id}).then(productObj=>{
        if (productObj!==null){
            return res.status(200).json({'data':productObj});
        }
        return res.status(404).json({'message':'Product Not Found!'});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
const update=async (req, res)=>{
    const updatedProduct=await ProductSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            price:req.body.price,
            qty:req.body.qty,
            image:req.body.image
        }
    },{new:true} );
    if (updatedProduct){
        return res.status(200).json({'message':'Product Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
const deleteById=async (req, res)=>{
    const deleteProduct=await ProductSchema.findOneAndUpdate({'_id':req.params.id});
    if (deleteProduct){
        return res.status(200).json({'message':'Product Deleted'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
const findAll=(req, res)=>{
    try{
        const {searchText, page=1, size=10}=req.query;

        const pageNumber=parseInt(page);
        const pageSize=parseInt(size);

        const query = {};
        if (searchText){
            query.$text={$search:searchText}
        }

        const skip=(pageNumber-1)*pageSize;

        const data=ProductSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
};

module.exports={
    create, findById, update, deleteById, findAll
}