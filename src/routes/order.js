import express from 'express';
import User from '../middleware/check_auth';
import OrdersController from '../controllers/orders';
import OrderValidation from '../validators/ordersvalidator';


const router = express.Router();

router.get('/', User.checkAuth, OrdersController.getAllOrders);

router.post('/', User.checkAuth, OrderValidation.createOrder, OrdersController.createOrder);

router.get('/:orderId', User.checkAuth, OrdersController.getOneOrder);

router.patch('/:orderId', User.checkAuth, OrderValidation.createOrder, OrdersController.updateOrder);

router.delete('/:orderId', User.checkAuth, OrdersController.deleteOrder);

export default router;
