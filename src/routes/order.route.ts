import { Router } from 'express';
import { OrderService } from '../services/order.service';

export const orderRouter = Router();
const orderService = new OrderService();

orderRouter.get('/', (req, res) => {
  orderService
    .getAllOrders()
    .then((result) => res.json({ status: 200, data: result }))
    .catch((err) => res.json({ code: 500, data: err }));
});

orderRouter.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  orderService
    .getOrderProducts(orderId)
    .then((result) => res.json({ status: 200, data: result }))
    .catch((err) => res.json({ code: 500, data: err }));
});

