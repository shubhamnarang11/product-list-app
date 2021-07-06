import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

const Product = sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    order_id: Sequelize.INTEGER,
    status: { type: Sequelize.ENUM, values: ['Processing', 'Done'] },
    quantity: Sequelize.INTEGER,
  },
  { timestamps: false }
);

Product.sync();

export default Product;
