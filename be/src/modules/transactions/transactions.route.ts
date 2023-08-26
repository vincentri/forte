import {
  filterByDateTransaction,
  listTransactions,
  topBrandModelTransactions,
} from './transactions.controller';

import checkAuth from '../../middleware/checkAuth';
import express from 'express';

const router = express.Router();

router.use(checkAuth);
router.get('/', listTransactions);
router.get('/top-brand-model', topBrandModelTransactions);
router.get('/filter-by-date', filterByDateTransaction);

export default router;
