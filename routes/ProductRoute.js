const express =require('express');
const productController= require('../controller/ProductController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
router.post('/create',verifyUser,productController.create);
router.get('/find-by-id/:id',verifyUser,productController.findById);
router.put('/update/:id',verifyUser,productController.update);
router.delete('/delete-by-id/:id',verifyUser,productController.deleteById);
router.get('/find-all',verifyUser,productController.findAll);
router.get('/count-all',verifyUser, productController.productsCount);

/*router.post('/create',productController.create);
router.get('/find-by-id/:id',productController.findById);
router.put('/update/:id',productController.update);
router.delete('/delete-by-id/:id',productController.deleteById);
router.get('/find-all',productController.findAll);
router.get('/count-all',productController.productsCount);*/
module.exports=router;