const express =require('express');
const AdminUserController =require('../controller/AdminUserController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();

router.post('/create',verifyUser,AdminUserController.create);
router.post('/login',AdminUserController.login);
router.get('/find-by-id',verifyUser,AdminUserController.findById);
router.put('/update/:id',verifyUser,AdminUserController.update);
router.delete('/delete-by-id/:id',verifyUser,AdminUserController.deleteById);
router.get('/find-all',verifyUser,AdminUserController.findAll);

module.exports=router