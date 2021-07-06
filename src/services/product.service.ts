import { Op } from 'sequelize';
import Product from '../models/product.model';

export class ProductService {
  updateProductQuantity(orderId: string, productId: string, updateParams: any) {
    return new Promise((resolves, reject) => {
      Product.update(updateParams, {
        where: { id: productId, order_id: orderId },
      })
        .then(resolves)
        .catch(reject);
    });
  }

  updateOrderStatus(orderIds: string[], status: string, productName: string) {
    return new Promise((resolves, reject) => {
      Product.update(
        { status },
        { where: { order_id: { [Op.in]: orderIds }, name: productName } }
      )
        .then(resolves)
        .catch(reject);
    });
  }
}
