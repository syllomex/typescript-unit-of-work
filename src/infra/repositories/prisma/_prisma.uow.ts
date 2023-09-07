import { type UnitOfWork } from '@/application/repositories'
import { type BaseRepository } from '@/infra/repositories/prisma/_prisma.base.repository'
import { type PrismaClient } from '@prisma/client'

export class PrismaUnitOfWork implements UnitOfWork {
  private readonly repositories: BaseRepository[]

  constructor(
    private readonly prisma: PrismaClient,
    ...repositories: BaseRepository[]
  ) {
    this.repositories = repositories
  }

  async transaction<T = unknown>(fn: () => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async prisma => {
      for (const repository of this.repositories) {
        repository.transacting(prisma)
      }
      const result = await fn()
      for (const repository of this.repositories) {
        repository.transacting(null)
      }
      return result
    })
  }
}
