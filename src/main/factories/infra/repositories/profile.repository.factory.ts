import { PrismaProfileRepository } from '@/infra/repositories/prisma'

export const makeProfileRepository = () => {
  return new PrismaProfileRepository()
}
