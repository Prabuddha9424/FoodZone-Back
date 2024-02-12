const CustomerSchema = require('../model/CustomerSchema');
const {query} = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const AdminUserSchema = require("../model/AdminUserSchema");
const jsonwebtoken = require("jsonwebtoken");
const salt = 10;

const create = (req, res) => {
    CustomerSchema.findOne({email: req.body.email}).then(user => {
        if (user === null) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                const user = new CustomerSchema({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    image: req.body.image,
                    address: req.body.address,
                    phone: req.body.phone
                });
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ps.devtech@gmail.com',
                        pass: 'aeet prqb fgtj zllz'
                    }
                });
                const mailOption = {
                    from: 'psdevtech@gmail.com',
                    to: req.body.email,
                    subject: 'New Account Creation',
                    text: 'Your account is successfully created.',
                }
                transporter.sendMail(mailOption).then(() => {
                    user.save().then(() => {
                        return res.status(201).json({'message': 'Customer Saved!'});
                    }).catch(err => {
                        return res.status(500).json(err.message);
                    })
                }).catch(err => {
                    return res.status(500).json(err.message);
                });
            })
        } else {
            return res.status(409).json({'error': 'Already exists!'});
        }
    })
};
const login = (req, res) => {
    CustomerSchema.findOne({email: req.body.email}).then(customer=>{
        if (customer!==null){
            bcrypt.compare(req.body.password,customer.password,function (err, result){
                if (err){
                    return res.status(500).json({'message':'Internal Server Error!'});
                }
                if (result){
                    const payload={email:customer.email}
                    const secretKey=process.env.SECRET_KEY;
                    const expiresIn='24h';

                    const token=jsonwebtoken.sign(payload, secretKey, {expiresIn});
                    return res.status(200).json({'token':token});
                }else {
                    return res.status(401).json({'message':'Password is Wrong!'});
                }
            })
        }else {
            return res.status(404).json({'message':'Customer Not Found!'});
        }
    })
}

/*-------------------Find Customer-----------------------*/
const findById = (req, res) => {
    CustomerSchema.findOne({'_id': req.params.id}).then(customerObj => {
        if (customerObj !== null) {
            return res.status(200).json({'data': customerObj});
        }
        return res.status(404).json({'message': 'Customer Not Found!'});
    }).catch(err => {
        return res.status(500).json(err);
    });
};
/*-------------------Update Customer-----------------------*/
const update = async (req, res) => {
    const updatedCustomer = await CustomerSchema.findOneAndUpdate({'_id': req.params.id}, {
        $set: {
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            mobile: req.body.mobile
        }
    }, {new: true});
    if (updatedCustomer) {
        return res.status(200).json({'message': 'Customer Updated'});
    } else {
        return res.status(500).json({'message': 'internal server error!'});
    }
};
/*-------------------Delete Customer-----------------------*/
const deleteById = async (req, res) => {
    try {
        const deleteCustomer = await CustomerSchema.findByIdAndDelete(req.params.id);
        if (deleteCustomer) {
            return res.status(200).json({'message': 'Customer Deleted'});
        } else {
            return res.status(404).json({'message': 'Customer not found'});
        }
    } catch (err) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

};
/*-------------------Find All Customers-----------------------*/
const findAll = async (req, res) => {
    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        const data = await CustomerSchema.find(query).limit(pageSize).skip(skip);
        return res.status(200).json(data);
    } catch (error) {
        //return res.status(500).json({'message':'internal server error'});
        return res.status(500).json(error);
    }
};
/*-------------------Count all documents in  Customer-----------------------*/
const customerCount = async (req, res) => {
    try {
        const countCustomers = await CustomerSchema.countDocuments();
        if (countCustomers) {
            return res.status(200).json(countCustomers);
        } else {
            return res.status(404).json({'message': 'No Any Customers'});
        }
    } catch (err) {
        return res.status(500).json({'message': 'Internal Server Error'});
    }

};
module.exports = {
    create, findById, update, deleteById, findAll, customerCount, login
}