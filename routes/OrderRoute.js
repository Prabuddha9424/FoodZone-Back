const express =require('express');
const orderController= require('../controller/OrderController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();

router.post('/create',orderController.create);
router.get('/find-by-id/:id',verifyUser,orderController.findById);
router.put('/update/:id',verifyUser,orderController.update);
router.delete('/delete-by-id/:id',orderController.deleteById);
router.get('/find-all',orderController.findAll);
router.get('/count-all/processing',verifyUser,orderController.ProcessingOrdersCount);
router.get('/count-all/completed',verifyUser,orderController.CompletedOrdersCount);
router.get('/count-all/customer',verifyUser,orderController.customerOrdersCount);
router.get('/find-all/customer',verifyUser,orderController.customerOrders);
router.get('/find-all/admin/payStatus=1',verifyUser,orderController.adminOrders);
router.put('/update/pay-states/:id',verifyUser,orderController.payStateUpdate);
module.exports=router;