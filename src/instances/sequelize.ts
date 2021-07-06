import { Dialect, Sequelize } from 'sequelize';
import { CONFIG } from '../helpers/config';

const {
  DATABASE: { USERNAME, DATABASE, PASSEORD, PORT, HOST, DIALECT },
} = CONFIG;

export const sequelize = new Sequelize(DATABASE, USERNAME, PASSEORD, {
  dialect: 'mysql',
  port: PORT,
  host: HOST,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
