import { MiddlewareParams } from "prisma";
import { prisma } from "../db/index";
/**
 * Validates the id.
 */

// prisma.$use(async (params: MiddlewareParams, next) => {
//   if (params.args.where.id && !ObjectId.isValid(params.args.where.id)) {
//     throw new Error();
//   }
//   return await next(params);
// });

prisma.$use(async (params: MiddlewareParams, next) => {
  const before = Date.now();
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

  return await next(params);
});
