import { PrismaClient, Users } from '@prisma/client';
import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../../utils/helper';

import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const body: LoginDto = req.body;
  let loginValidation = plainToInstance(LoginDto, body);
  let errors = await validate(loginValidation);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }

  try {
    const findUser = await checkActiveUser(body.email);
    const isPasswordMatch = await comparePassword(
      body.password,
      findUser.password
    );
    if (!isPasswordMatch) throw new Error('Invalid password');
    return res.status(200).json({
      accessToken: await generateToken({
        email: findUser.email,
        name: findUser.name,
      }),
    });
  } catch (error: unknown) {
    return res.status(422).json({ message: (error as Error).message });
  }
};

export const checkActiveUser = async (email: string): Promise<Users> => {
  const findUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (!findUser) throw Error('User not found');
  if (!findUser.is_active) throw Error('User not active');

  return findUser;
};
