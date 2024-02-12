const AdminUserSchema = require('../model/AdminUserSchema')
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jsonwebtoken = require("jsonwebtoken");

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
/*-------------------Login Admin User-----------------------*/
const login = (req, res) => {
    AdminUserSchema.findOne({email: req.body.email}).then(admin=>{
        if (admin!==null){
            bcrypt.compare(req.body.password,admin.password,function (err, result){
                if (err){
                    return res.status(500).json({'message':'Internal Server Error!'});
                }
                if (result){
                    const payload={email:admin.email}
                    const secretKey=process.env.SECRET_KEY;
                    const expiresIn='24h';

                    const token=jsonwebtoken.sign(payload, secretKey, {expiresIn});
                    return res.status(200).json({'token':token});
                }else {
                    return res.status(401).json({'message':'Password is Wrong!'});
                }
            })
        }else {
            return res.status(404).json({'message':'Admin Not Found!'});
        }
    })
}
/*-------------------Reset Admin Password-----------------------*/
const resetPassword = async (req, res) => {
   /* const updatedAdmin=await AdminUserSchema.findOneAndUpdate({email: req.body.email},{
        $set:{
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            qty:req.body.qty,
            intro:req.body.intro,
            image:req.body.image
        }
    },{new:true} );
    if (updatedProduct){
        return res.status(200).json({'message':'Product Updated'});
    }else {
        return res.status(500).json({'message':'internal server error!'});
    }*/

    AdminUserSchema.findOne({ email: req.body.email })
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            console.log(req.body.currentPassword);
            console.log(admin.password);
            bcrypt.compare(req.body.currentPassword, admin.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                if (!result) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }
                admin.password = bcrypt.hashSync(req.body.password, salt);
                admin.save()
                    .then(() => {
                        return res.status(200).json({ message: 'Password updated successfully' });
                    })
                    .catch(err => {
                        return res.status(500).json(err);
                    });
            });
        })
        .catch(err => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};
/*-------------------Find Admin-----------------------*/
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
    create, findById, update, deleteById, findAll, login, resetPassword
}