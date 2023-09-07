import { prisma } from '@/infra/lib/prisma'
import { PrismaUnitOfWork, type BaseRepository } from '@/infra/repositories/prisma'

export const makeUnitOfWork = (...repositories: BaseRepository[]) => {
  return new PrismaUnitOfWork(prisma, ...repositories)
}
