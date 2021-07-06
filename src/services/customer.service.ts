import Customer from '../models/customer.model';
import Order from '../models/order.model';
import Product from '../models/product.model';

export class CustomerService {
  getCustomers() {
    return new Promise((resolves, reject) => {
      Customer.findAll().then(resolves).catch(reject);
    });
  }

  getCustomerOrders(customerId: string) {
    return new Promise((resolves, reject) => {
      Order.findAll({
        where: { customer_id: customerId },
        include: [{ model: Product, as: 'products' }],
      })
        .then(resolves)
        .catch(reject);
    });
  }
}
