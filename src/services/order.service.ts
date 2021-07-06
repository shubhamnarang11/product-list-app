import Order from '../models/order.model';
import Product from '../models/product.model';

export class OrderService {
  getAllOrders() {
    return new Promise((resolves, reject) => {
      Order.findAll({ include: [{ model: Product, as: 'products' }] })
        .then(resolves)
        .catch(reject);
    });
  }

  getOrderProducts(orderId: string) {
    return new Promise((resolves, reject) => {
      Product.findAll({
        where: { order_id: orderId },
      })
        .then(resolves)
        .catch(reject);
    });
  }

}
