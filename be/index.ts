import express, { Express } from 'express';

import AuthsRouter from './src/modules/auths/auths.route';
import BrandsRouter from './src/modules/brands/brands.route';
import ModelsRouter from './src/modules/models/models.route';
import TransactionsRouter from './src/modules/transactions/transactions.route';
import UsersRouter from './src/modules/users/users.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', AuthsRouter);
app.use('/brands', BrandsRouter);
app.use('/models', ModelsRouter);
app.use('/users', UsersRouter);
app.use('/transactions', TransactionsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
