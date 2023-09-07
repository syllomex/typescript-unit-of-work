import { PrismaAccountRepository } from '@/infra/repositories/prisma'

export const makeAccountRepository = () => {
  return new PrismaAccountRepository()
}
