import express from 'express';
import checkAuth from '../middleware/check_auth';
import ProductController from '../controllers/product';


const router = express.Router();

router.get('/', ProductController.getAllProducts);

router.post('/', checkAuth, ProductController.createProduct);

router.get('/:producctId', ProductController.getOneProduct);

router.patch('/:productId', checkAuth, ProductController.updateProduct);

router.delete('/:productId', checkAuth, ProductController.deleteProduct);

export default router;
