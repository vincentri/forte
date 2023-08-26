import checkAuth from '../../middleware/checkAuth';
import express from 'express';
import { getAll } from './brands.controller';

const router = express.Router();

router.use(checkAuth);
router.get('/', getAll);

export default router;
