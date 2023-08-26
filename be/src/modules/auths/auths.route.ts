import express from 'express';
import { login } from './auths.controller';

const router = express.Router();

router.post('/login', login);

export default router;
