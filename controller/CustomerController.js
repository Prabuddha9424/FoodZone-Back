const CustomerSchema = require('../model/CustomerSchema');
const {query} = require("express");
const AdminUserSchema = require("../model/AdminUserSchema");

/*-------------------Create New Customer-----------------------*/
const create=(req, res)=>{
    const customer= new CustomerSchema({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        image:req.body.image,
        address:req.body.address,
        phone:req.body.phone
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
    try{
        const deleteCustomer=await CustomerSchema.findByIdAndDelete(req.params.id);
        if (deleteCustomer){
            return res.status(200).json({'message':'Customer Deleted'});
        }else {
            return res.status(404).json({ 'message': 'Customer not found' });
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }

};
/*-------------------Find All Customers-----------------------*/
const findAll=async (req, res)=>{
    try{
        const {searchText, page=1, size=10}=req.query;

        const pageNumber=parseInt(page);
        const pageSize=parseInt(size);

        const query = {};
        if (searchText){
            query.$text={$search:searchText}
        }

        const skip=(pageNumber-1)*pageSize;

        const data=await CustomerSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        //return res.status(500).json({'message':'internal server error'});
        return res.status(500).json(error);
    }
};
/*-------------------Count all documents in  Customer-----------------------*/
const customerCount=async (req, res)=>{
    try{
        const countCustomers=await CustomerSchema.countDocuments();
        if (countCustomers){
            return res.status(200).json(countCustomers);
        }else {
            return res.status(404).json({ 'message': 'No Any Customers' });
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }

};
module.exports={
    create, findById, update, deleteById, findAll, customerCount
}