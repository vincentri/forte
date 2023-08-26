import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  try {
    return res.json({
      data: await prisma.brands.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          is_active: true,
        },
      }),
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};
