const express =require('express');
const productController= require('../controller/ProductController');
const verifyUser= require('../middleware/AuthMiddleware');
const router=express.Router();
/*router.post('/create',verifyUser,productController.create);
router.get('/find-by-id',verifyUser,productController.findById);
router.put('/update',verifyUser,productController.update);
router.delete('/delete-by-id',verifyUser,productController.deleteById);
router.get('/find-all',verifyUser,productController.findAll);*/

router.post('/create',productController.create);
router.get('/find-by-id/:id',productController.findById);
router.put('/update/:id',productController.update);
router.delete('/delete-by-id/:id',productController.deleteById);
router.get('/find-all',productController.findAll);
module.exports=router;