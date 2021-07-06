import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';
import Product from './product.model';

const Order = sequelize.define(
  'order',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: Sequelize.DATE,
    customer_id: Sequelize.INTEGER,
  },
  { timestamps: false }
);

Order.hasMany(Product, {
  foreignKey: 'order_id',
  as: 'products',
});

Order.sync();

export default Order;
