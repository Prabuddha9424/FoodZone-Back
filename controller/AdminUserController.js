const AdminUserSchema = require('../model/AdminUserSchema')
const {query} = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const salt = 10;

/*-------------------Create New Admin User-----------------------*/
const create=(req, res)=>{
    AdminUserSchema.findOne({email:req.body.email}).then(user=>{
        if (user===null){
            bcrypt.hash(req.body.password,salt,function (err, hash){
                if (err){
                    return res.status(500).json(err.message);
                }
                const user=new AdminUserSchema({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash,
                    address:req.body.address,
                    phone:req.body.phone
                });
                const transporter=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'ps.devtech@gmail.com',
                        pass:'aeet prqb fgtj zllz'
                    }
                });
                const mailOption={
                    from:'psdevtech@gmail.com',
                    to:req.body.email,
                    subject:'New Account Creation',
                    text:'Your account is successfully created.',
                }
                transporter.sendMail(mailOption).then(()=>{
                    user.save().then(()=>{
                        return res.status(201).json({'message':'Admin User Saved!'});
                    }).catch(err=>{
                        return res.status(500).json(err.message);
                    })
                }).catch(err=>{
                    return res.status(500).json(err.message);
                });
            })
        }else {
            return res.status(409).json({'error':'Already exists!'});
        }
    })
};
/*-------------------Find Customer-----------------------*/
const findById=(req, res)=>{
    AdminUserSchema.findOne({'_id': req.params.id}).then(customerObj=>{
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
    const updatedAdmin=await AdminUserSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            phone:req.body.phone
        }
    },{new:true} );
    if (updatedAdmin){
        return res.status(200).json({'message':'Admin User Updated!'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }
};
/*-------------------Delete Customer-----------------------*/
const deleteById=async (req, res)=>{
    try{
        const deleteAdminUser=await AdminUserSchema.findByIdAndDelete(req.params.id);
        if (deleteAdminUser){
            return res.status(200).json({'message':'Admin User Deleted'});
        }else {
            return res.status(404).json({ 'message': 'Admin User not found' });
        }
    }catch (err){
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }

};
/*-------------------Find All Admin Users-----------------------*/
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

        const data=await AdminUserSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    }catch (error){
        return res.status(500).json({'message':'internal server error'});
    }
};

module.exports={
    create, findById, update, deleteById, findAll
}