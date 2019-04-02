import express from 'express';
import User from '../middleware/check_auth';
import ProductController from '../controllers/product';


const router = express.Router();

router.get('/', User.checkAuth, ProductController.getAllProducts);

router.post('/', User.checkAuth, ProductController.createProduct);

router.get('/:producctId', ProductController.getOneProduct);

router.patch('/:productId', User.checkAuth, ProductController.updateProduct);

router.delete('/:productId', User.checkAuth, ProductController.deleteProduct);

export default router;
