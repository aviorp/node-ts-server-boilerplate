import { prisma } from '@/db';
import { USER_MODELS } from '@/utils/constants';
prisma.$use(async (params, next) => {
  if (params.action === 'create') {
    for (const model of USER_MODELS) {
      const isExist = await prisma[model].findUnique({
        where: {
          username: params.args.data.username,
        },
      });
      if (isExist) {
        throw new Error(`Username ${params.args.data.username} already exist`);
      }
    }
    params.args.data.created_at = new Date();
    return next(params);
  }
  return next(params);
});
