import { Request, Response } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../utils/helper';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const body: CreateUserDto = req.body;
  let createUserValidation = plainToInstance(CreateUserDto, body);
  let errors = await validate(createUserValidation);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }
  const email = req.body.email.toLowerCase();
  const findUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (findUser) {
    res.status(422).send({
      message: 'Email already registered',
    });
    return;
  }
  const password = await hashPassword(body.password);
  try {
    const result = await prisma.users.create({
      data: {
        email,
        password,
        name: body.name,
      },
    });
    return res.json(result);
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

export const userDetail = async (req: Request, res: Response) => {
  try {
    return res.json({
      data: res.locals.user,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};
