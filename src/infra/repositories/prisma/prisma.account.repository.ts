import { type AccountRepository } from '@/application/repositories'
import { Account } from '@/domain/entities'
import { BaseRepository } from '@/infra/repositories/prisma/_prisma.base.repository'

export class PrismaAccountRepository extends BaseRepository implements AccountRepository {
  async save(account: Account): Promise<void> {
    await this.uow.account.create({
      data: account,
      select: { id: true },
    })
  }

  async findById(id: string): Promise<Account | null> {
    const result = await this.uow.account.findUnique({ where: { id } })
    if (result === null) return null
    return new Account(result)
  }
}
