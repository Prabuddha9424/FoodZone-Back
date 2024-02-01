const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const salt = 10;
const nodemailer= require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const register = (req, res) => {
    UserSchema.findOne({email:req.body.email}).then(user=>{
        if (user===null){
            bcrypt.hash(req.body.password,salt,function (err, hash){
                if (err){
                    return res.status(500).json(err.message);
                }
                const user=new UserSchema({
                    fullName:req.body.fullName,
                    email:req.body.email,
                    password:hash,
                    address:req.body.address,
                    mobile:req.body.mobile
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
                        return res.status(201).json({'message':'User Saved!'});
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

}
const login = (req, res) => {
    UserSchema.findOne({email: req.body.email}).then(user=>{
        if (user!==null){
            bcrypt.compare(req.body.password,user.password,function (err, result){
                if (err){
                    return res.status(500).json({'message':'Internal Server Error!'});
                }
                if (result){
                    const payload={email:user.email}
                    const secretKey=process.env.SECRET_KEY;
                    const expiresIn='24h';

                    const token=jsonwebtoken.sign(payload, secretKey, {expiresIn});
                    return res.status(200).json({'token':token});
                }else {
                    return res.status(401).json({'message':'Password is Wrong!'});
                }
            })
        }else {
            return res.status(404).json({'message':'User Not Found!'});
        }
    })
}
module.exports = {
    register, login
}
