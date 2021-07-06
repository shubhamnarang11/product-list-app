import { Router } from 'express';
import { CustomerService } from '../services/customer.service';

export const customerRouter = Router();
const customerService = new CustomerService();

customerRouter.get('/', (req, res) => {
  customerService
    .getCustomers()
    .then((result) => res.json({ status: 200, data: result }))
    .catch((err) => res.json({ code: 500, data: err }));
});

customerRouter.get('/:customerId', (req, res) => {
  const { customerId } = req.params;
  customerService
    .getCustomerOrders(customerId)
    .then((result) => res.json({ status: 200, data: result }))
    .catch((err) => res.json({ code: 500, data: err }));
});
