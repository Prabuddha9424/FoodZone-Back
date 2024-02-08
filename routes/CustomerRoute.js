const express =require('express');
const customerController= require('../controller/CustomerController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
//router.post('/create',verifyUser,customerController.create);
/*router.post('/create',customerController.create);
router.get('/find-by-id',verifyUser,customerController.findById);
router.put('/update',verifyUser,customerController.update);
router.delete('/delete-by-id',verifyUser,customerController.deleteById);
router.get('/find-all',verifyUser,customerController.findAll);*/

router.post('/create',customerController.create);
router.get('/find-by-id',customerController.findById);
router.put('/update/:id',customerController.update);
router.delete('/delete-by-id/:id',customerController.deleteById);
router.get('/find-all',customerController.findAll);
router.get('/count-all',customerController.customerCount);
module.exports=router;