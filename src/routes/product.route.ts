import { Router } from 'express';
import { ProductService } from '../services/product.service';

export const productRouter = Router();
const productService = new ProductService();

productRouter.put('/', (req, res) => {
  const { status, orderIds, productName } = req.body;

  productService
    .updateOrderStatus(orderIds, status, productName)
    .then(() =>
      res.json({
        status: 200,
        data: `Product status has been updated successfully!!!`,
      })
    )
    .catch((err) => res.json({ code: 500, data: err }));
});

productRouter.put('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;

  productService
    .updateProductQuantity(orderId, productId, req.body)
    .then(() =>
      res.json({
        status: 200,
        data: `Product ${productId} quantity has been updated successfully!!!`,
      })
    )
    .catch((err) => res.json({ code: 500, data: err }));
});
