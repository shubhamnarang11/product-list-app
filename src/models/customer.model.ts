import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';
import Order from './order.model';

const Customer = sequelize.define(
  'customer',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: Sequelize.STRING,
  },
  { timestamps: false }
);

Customer.hasMany(Order, {
  foreignKey: 'customer_id',
  as: 'orders',
});

Customer.sync();

export default Customer;
