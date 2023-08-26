import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { FilterByDateTransactionsQueryFilterEnum } from './enum/filter-date-transactions.enum';
import { FilterByTransactionsQueryFilter } from './query-filter/filter-date-transactions.query-filter';
import { ListTransactionsQueryFilter } from './query-filter/list-transactions.query-filter';
import { TopBrandTransactionsQueryFilter } from './query-filter/top-brand-transactions.query-filter';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const prisma = new PrismaClient();

export const listTransactions = async (req: Request, res: Response) => {
  const body: ListTransactionsQueryFilter = req.query;
  let listTransactionDto = plainToInstance(ListTransactionsQueryFilter, body);
  let errors = await validate(listTransactionDto);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }

  let limit = parseInt(
    body?.limit && parseInt(body.limit) > 30 ? '30' : body.limit || '30'
  );
  const page = body.page && parseInt(body.page) > 1 ? parseInt(body.page) : 1;
  const skip = (page - 1) * limit;
  let query: Record<string, any> = {};
  if (body.modelId) query.model_id = parseInt(body.modelId);
  if (body.status) query.status = body.status;
  if (body.brandId)
    query = {
      ...query,
      ...{
        models: {
          brand_id: parseInt(body.brandId),
        },
      },
    };
  const listTransactions = await prisma.transactions.findMany({
    where: query,
    orderBy: {
      id: 'desc',
    },
    take: limit,
    skip,
    select: {
      transaction_number: true,
      created_at: true,
      status: true,
      models: {
        select: {
          name: true,
          brands: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const totalTransaction = await prisma.transactions.count({
    where: query,
  });

  try {
    return res.json({
      data: listTransactions.map((transaction) => {
        return {
          transactionNumber: transaction.transaction_number,
          createdAt: transaction.created_at,
          model: transaction.models?.name,
          brand: transaction.models?.brands.name,
          status: transaction.status,
        };
      }),
      pagination: {
        total: totalTransaction,
        page,
        limit,
        hasNext: page * limit >= totalTransaction ? false : true,
        hasPrev: page == 1 ? false : true,
      },
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

export const topBrandModelTransactions = async (
  req: Request,
  res: Response
) => {
  const body: TopBrandTransactionsQueryFilter = req.query;
  let topBrandValidation = plainToInstance(
    TopBrandTransactionsQueryFilter,
    body
  );
  let errors = await validate(topBrandValidation);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }

  let limit = parseInt(body?.limit || '5');
  const whereConditionTemp = [];
  if (body.status)
    whereConditionTemp.push(`transactions.status = '${body.status}'`);
  if (body.modelId)
    whereConditionTemp.push(`models.id = ${parseInt(body.modelId)}`);
  if (body.brandId)
    whereConditionTemp.push(`models.id = ${parseInt(body.brandId)}`);
  if (limit > 5) limit = 5;

  let whereCondition = '';
  if (whereConditionTemp.length > 0) {
    whereCondition = `where ` + whereConditionTemp.join(' and ');
  }

  let selectName = 'brands.name';
  let groupBy = 'brands.id';
  if (body.groupBy) {
    selectName = `${body.groupBy}.name`;
    groupBy = `${body.groupBy}.id`;
  }

  try {
    const listTransactions: any[] = await prisma.$queryRaw(
      Prisma.sql`select count(*) as total, ${Prisma.raw(
        `${selectName}`
      )} from transactions
    inner join models on transactions.model_id = models.id
    inner join brands on brands.id = models.brand_id ${Prisma.raw(
      `${whereCondition}`
    )}
    GROUP BY ${Prisma.raw(`${groupBy}`)}
    order by total desc
    limit ${Prisma.sql`${limit}`}`
    );

    listTransactions.map((transaction) => {
      transaction.total = Number(transaction.total);
    });

    return res.json({
      data: listTransactions,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

export const filterByDateTransaction = async (req: Request, res: Response) => {
  const body: FilterByTransactionsQueryFilter = req.query;
  let filterByValidation = plainToInstance(
    FilterByTransactionsQueryFilter,
    body
  );
  let errors = await validate(filterByValidation);
  if (errors.length > 0) {
    res.status(422).send(errors);
    return;
  }

  const whereConditionTemp = [];
  let groupBy = '';
  if (body.status)
    whereConditionTemp.push(`transactions.status = '${body.status}'`);
  if (body.modelId)
    whereConditionTemp.push(`models.id = ${parseInt(body.modelId)}`);
  if (body.brandId)
    whereConditionTemp.push(`models.id = ${parseInt(body.brandId)}`);

  let whereCondition = '';
  if (
    body.filterBy === FilterByDateTransactionsQueryFilterEnum.lastThreeMonth
  ) {
    whereConditionTemp.push(
      `transactions.created_at >= date_trunc('month', now()) - interval '3 month' and transactions.created_at < date_trunc('month', now())`
    );
    groupBy = 'year,month';
  }
  if (body.filterBy === FilterByDateTransactionsQueryFilterEnum.currentYear) {
    whereConditionTemp.push(
      `transactions.created_at >= date_trunc( 'year', now( ) ) and transactions.created_at <= date_trunc( 'year', now( ) ) + INTERVAL '12 month'`
    );
    groupBy = 'year,month';
  }

  if (whereConditionTemp.length > 0) {
    whereCondition = `where ` + whereConditionTemp.join(' and ');
  }

  try {
    const listTransactions: any[] = await prisma.$queryRaw(
      Prisma.sql`select date_part('year', transactions.created_at) AS year,
    date_part('month', transactions.created_at) AS month,
    count('*') as total from transactions
    inner join models on transactions.model_id = models.id
    inner join brands on brands.id = models.brand_id ${Prisma.raw(
      `${whereCondition}`
    )}
    GROUP BY ${Prisma.raw(`${groupBy}`)}
    order by month asc`
    );
    listTransactions.map((transaction) => {
      transaction.total = Number(transaction.total);
    });
    return res.json({
      data: listTransactions,
    });
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};
