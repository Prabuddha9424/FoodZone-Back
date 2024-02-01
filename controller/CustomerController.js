const CustomerSchema = require('../model/CustomerSchema');
const {query} = require("express");

/*-------------------Create New Customer-----------------------*/
const create=(req, res)=>{
    const customer= new CustomerSchema({
        fullName:req.body.fullName,
        email:req.body.email,
        address:req.body.address,
        mobile:req.body.mobile
    });
    customer.save().then(customer=>{
        return res.status(200).json({'message':'Customer Saved'});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
/*-------------------Find Customer-----------------------*/
const findById=(req, res)=>{
    CustomerSchema.findOne({'_id': req.params.id}).then(customerObj=>{
        if (customerObj!==null){
            return res.status(200).json({'data':customerObj});
        }
        return res.status(404).json({'message':'Customer Not Found!'});
    }).catch(err=>{
        return res.status(500).json(err);
    });
};
/*-------------------Update Customer-----------------------*/
const update=async (req, res)=>{
    const updatedCustomer=await CustomerSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            fullName:req.body.fullName,
            email:req.body.email,
            address:req.body.address,
            mobile:req.body.mobile
        }
    },{new:true} );
    if (updatedCustomer){
        return res.status(200).json({'message':'Customer Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
/*-------------------Delete Customer-----------------------*/
const deleteById=async (req, res)=>{
    const deleteCustomer=await CustomerSchema.findOneAndUpdate({'_id':req.params.id});
    if (deleteCustomer){
        return res.status(200).json({'message':'Customer Deleted'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
/*-------------------Find All Customers-----------------------*/
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

        const data=CustomerSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
};

module.exports={
    create, findById, update, deleteById, findAll
}