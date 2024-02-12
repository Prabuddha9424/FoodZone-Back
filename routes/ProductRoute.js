const express =require('express');
const productController= require('../controller/ProductController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
router.post('/create',verifyUser,productController.create);
router.get('/find-by-id/:id',verifyUser,productController.findById);
router.put('/update/:id',verifyUser,productController.update);
router.delete('/delete-by-id/:id',verifyUser,productController.deleteById);
router.get('/count-all',verifyUser, productController.productsCount);

router.get('/find-all',productController.findAll);
router.get('/set-menu', productController.allSetMenu);
router.get('/desert', productController.allDeserts);
router.get('/beverage', productController.allBeverages);
router.get('/all-filter1', productController.productFilter1);
router.get('/all-filter2', productController.productFilter2);
router.get('/all-filter3', productController.productFilter3);

module.exports=router;