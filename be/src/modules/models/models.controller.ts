import { Request, Response } from 'express';

import { GetAllModelsQueryFilter } from './query-filter/get-all-models.query-filter';
import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  const body: GetAllModelsQueryFilter = req.query;
  let getAllModelFiler = plainToInstance(GetAllModelsQueryFilter, body);
  let errors = await validate(getAllModelFiler);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }
  let query: Record<string, any> = {
    is_active: true,
  };
  if (body.brandId && !isNaN(parseInt(body.brandId || '')))
    query.brand_id = parseInt(body.brandId);
  try {
    const data = await prisma.models.findMany({
      where: query,
      select: {
        id: true,
        name: true,
        brands: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.json({ data });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};
