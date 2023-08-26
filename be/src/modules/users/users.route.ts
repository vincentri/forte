import { createUser, userDetail } from './users.controller';

import checkAuth from '../../middleware/checkAuth';
import express from 'express';

const router = express.Router();

router.use(checkAuth);
router.post('/', createUser);
router.get('/detail', userDetail);

export default router;
