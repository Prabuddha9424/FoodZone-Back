const express =require('express');
const customerController= require('../controller/CustomerController');
const verifyUser= require('../middleware/AuthMiddleware');
const AdminUserController = require("../controller/AdminUserController");
const router=express.Router();

router.post('/create',customerController.create);
router.post('/login',customerController.login);
router.get('/find-by-id',verifyUser,customerController.findById);
router.put('/update/:id',verifyUser,customerController.update);
router.delete('/delete-by-id/:id',verifyUser,customerController.deleteById);
router.get('/find-all',verifyUser,customerController.findAll);
router.get('/count-all',verifyUser,customerController.customerCount);
module.exports=router;