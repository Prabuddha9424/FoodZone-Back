const express =require('express');
const orderController= require('../controller/OrderController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
/*router.post('/create',verifyUser,orderController.create);
router.get('/find-by-id',verifyUser,orderController.findById);
router.put('/update',verifyUser,orderController.update);
router.delete('/delete-by-id',verifyUser,orderController.deleteById);
router.get('/find-all',verifyUser,orderController.findAll);*/

router.post('/create',verifyUser,orderController.create);
router.get('/find-by-id/:id',verifyUser,orderController.findById);
router.put('/update/:id',verifyUser,orderController.update);
router.delete('/delete-by-id/:id',verifyUser,orderController.deleteById);
router.get('/find-all',verifyUser,orderController.findAll);
router.get('/count-all',verifyUser,orderController.ordersCount);
module.exports=router;