const OrderSchema = require('../model/OrderSchema');

const create=(req, res)=>{
    const order= new OrderSchema({
        product:req.body.product,
        customerDetails:req.body.customerDetails,
        qty:req.body.qty,
        price:req.body.price,
        token:req.body.token
    });
    order.save().then(customer=>{
        return res.status(200).json({'message':'Order Placed'},{customer});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
const findById=(req, res)=>{
    OrderSchema.findOne({'_id': req.params.id}).then(orderObj=>{
        if (orderObj!==null){
            return res.status(200).json({'data':orderObj});
        }
        return res.status(404).json({'message':'Order Not Found!'});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
const update=async (req, res)=>{
    const updatedOrder=await OrderSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            product:req.body.product,
            customerDetails:req.body.customerDetails,
            qty:req.body.qty,
            price:req.body.price,
            token:req.body.token
        }
    },{new:true} );
    if (updatedOrder){
        return res.status(200).json({'message':'Order Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
const deleteById=async (req, res)=>{
    const deleteOrder=await OrderSchema.findOneAndUpdate({'_id':req.params.id});
    if (deleteOrder){
        return res.status(200).json({'message':'Order Deleted'});
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

        const data=OrderSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
};

module.exports={
    create, findById, update, deleteById, findAll
}