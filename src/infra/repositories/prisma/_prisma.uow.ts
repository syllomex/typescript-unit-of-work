import { type UnitOfWork } from '@/application/repositories'
import { type BaseRepository } from '@/application/repositories/_base.repository'
import { type PrismaClient } from '@prisma/client'

export class PrismaUnitOfWork<Repositories extends Record<string, BaseRepository>> implements UnitOfWork<Repositories> {
  private readonly repositories: Repositories

  constructor(
    private readonly prisma: PrismaClient,
    repositories: Repositories,
  ) {
    this.repositories = repositories
  }

  async transaction<T = unknown>(fn: (repositories: Repositories) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async prisma => {
      for (const repository of Object.keys(this.repositories)) {
        this.repositories[repository].transacting(prisma)
      }
      const result = await fn(this.repositories)
      for (const repository of Object.keys(this.repositories)) {
        this.repositories[repository].transacting(null)
      }
      return result
    })
  }
}
