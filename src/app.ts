import Express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { CONFIG } from './helpers/config';
import { customerRouter } from './routes/customer.route';
import { orderRouter } from './routes/order.route';
import { productRouter } from './routes/product.route';

const { PORT } = CONFIG;
const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

app.get('/', (req: Express.Request, res: Express.Response, next: any) => {
  res.json('Welcome to our App!');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
