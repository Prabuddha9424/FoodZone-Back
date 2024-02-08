const express =require('express');
const orderController= require('../controller/OrderController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
/*router.post('/create',verifyUser,orderController.create);
router.get('/find-by-id',verifyUser,orderController.findById);
router.put('/update',verifyUser,orderController.update);
router.delete('/delete-by-id',verifyUser,orderController.deleteById);
router.get('/find-all',verifyUser,orderController.findAll);*/

router.post('/create',orderController.create);
router.get('/find-by-id/:id',orderController.findById);
router.put('/update/:id',orderController.update);
router.delete('/delete-by-id/:id',orderController.deleteById);
router.get('/find-all',orderController.findAll);
module.exports=router;