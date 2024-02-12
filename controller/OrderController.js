const OrderSchema = require('../model/OrderSchema');
const ProductSchema = require("../model/ProductSchema");
const nodemailer = require("nodemailer");

const create=(req, res)=>{
    const order= new OrderSchema({
        item:req.body.item,
        email:req.body.email,
        qty:req.body.qty,
        status:req.body.status,
        payStatus:req.body.payStatus,
        price:req.body.price,
    });
    order.save().then(order=>{
        return res.status(200).json({'message':'Order Placed'});
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
            item:req.body.item,
            qty:req.body.qty,
            status:req.body.status,
            payStatus:req.body.payStatus,
            price:req.body.price,
        }
    },{new:true} );
    if (updatedOrder){
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'ps.devtech@gmail.com',
                pass:'aeet prqb fgtj zllz'
            }
        });
        const mailOption={
            from:'psdevtech@gmail.com',
            to:updatedOrder.email,
            subject:' Your Food Order is Complete!',
            text:'We are thrilled to inform you that your recent food order with FooDZone has been successfully prepared and is ready for pickup',
        }
        await transporter.sendMail(mailOption);
        return res.status(200).json({'message':'Order Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
const payStateUpdate=async (req, res)=>{
    const email = req.query.email;
    const updatedOrder=await OrderSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            item:req.body.item,
            qty:req.body.qty,
            status:req.body.status,
            payStatus:req.body.payStatus,
            price:req.body.price,
        }
    },{new:true} );
    if (updatedOrder){
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'ps.devtech@gmail.com',
                pass:'aeet prqb fgtj zllz'
            }
        });
        const mailOption={
            from:'psdevtech@gmail.com',
            to:updatedOrder.email,
            subject:' Your Order Is Confirmed!',
            text:'Thank you for your recent order with FooDZone! We are excited to let you know that your order has been successfully processed and is now confirmed',
        }
        await transporter.sendMail(mailOption);
        return res.status(200).json({'message':'Order Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
const deleteById=async (req, res)=>{
    const deleteOrder=await OrderSchema.findByIdAndDelete({'_id':req.params.id});
    if (deleteOrder){
        return res.status(200).json({'message':'Order Deleted'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
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

        const data=await OrderSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
};
const ProcessingOrdersCount=async (req, res)=>{
    try{
        const countOrders=await OrderSchema.countDocuments({status:0});
        if (countOrders){
            return res.status(200).json(countOrders);
        }else {
            return res.status(404).json({ 'message': 'No Any Orders'});
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
const CompletedOrdersCount=async (req, res)=>{
    try{
        const countOrders=await OrderSchema.countDocuments({status:1});
        if (countOrders){
            return res.status(200).json(countOrders);
        }else {
            return res.status(404).json({ 'message': 'No Any Completed Order'});
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
const customerOrdersCount=async (req, res)=>{
    try{
        const email = req.query.email;
        const countOrders=await OrderSchema.countDocuments({email, payStatus: 0});
        if (countOrders>0){
            return res.status(200).json(countOrders);
        }else {
            return res.status(404).json({ 'message': 'No Any Order'});
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
};
const customerOrders = async (req, res) => {
    try {
        const email = req.query.email;
        let customerOrders = await OrderSchema.find({email, payStatus: 0});
        if (customerOrders) {
            return res.status(200).json(customerOrders);
        } else {
            return res.status(404).json({ message: 'No orders found for this email' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const adminOrders = (req, res) => {
    try {
        OrderSchema.find({ payStatus: 1 }).then((customerOrders) => {
            if (customerOrders) {
                return res.status(200).json(customerOrders);
            } else {
                return res.status(404).json({ message: 'No orders found' });
            }
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching orders' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports={
    create, findById, update, deleteById, findAll, ProcessingOrdersCount,
    CompletedOrdersCount, customerOrdersCount, customerOrders, payStateUpdate, adminOrders
}