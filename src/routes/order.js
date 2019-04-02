import express from 'express';
import checkAuth from '../middleware/check_auth';
import OrdersController from '../controllers/orders';


const router = express.Router();

router.get('/', checkAuth, OrdersController.getAllOrders);

router.post('/', checkAuth, OrdersController.createOrder);

router.get('/:orderId', checkAuth, OrdersController.getOneOrder);

router.patch('/:orderId', checkAuth, OrdersController.updateOrder);

router.delete('/:OrderId', checkAuth, OrdersController.deleteOrder);

export default router;
