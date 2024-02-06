const express =require('express');
const AdminUserController =require('../controller/AdminUserController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
//router.post('/create',verifyUser,customerController.create);
router.post('/create',AdminUserController.create);
router.get('/find-by-id',verifyUser,AdminUserController.findById);
//router.put('/update',verifyUser,AdminUserController.update);
router.put('/update/:id',AdminUserController.update);
//router.delete('/delete-by-id',verifyUser,AdminUserController.deleteById);
router.delete('/delete-by-id/:id',AdminUserController.deleteById);
//router.get('/find-all',verifyUser,AdminUserController.findAll);
router.get('/find-all',AdminUserController.findAll);
module.exports=router