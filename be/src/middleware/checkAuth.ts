import { NextFunction, Request, Response } from 'express';

import { Users } from '@prisma/client';
import { checkActiveUser } from '../modules/auths/auths.controller';
import { verifyToken } from '../utils/helper';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) throw Error('Token not send');
    const payload = await verifyToken(authorization.replace('Bearer ', ''));
    const checkUser = await checkActiveUser((payload as Users).email);
    res.locals.user = checkUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
};

export default checkAuth;
