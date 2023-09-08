import { type BaseRepository } from '@/application/repositories/_base.repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaUnitOfWork } from '@/infra/repositories/prisma'

export const makeUnitOfWork = <Repositories extends Record<string, BaseRepository>>(repositories: Repositories) => {
  return new PrismaUnitOfWork<Repositories>(prisma, repositories)
}
