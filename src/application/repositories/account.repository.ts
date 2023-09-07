import { type BaseRepository } from '@/application/repositories/_base.repository'
import { type Account } from '@/domain/entities'

export interface AccountRepository extends BaseRepository {
  save: (account: Account) => Promise<void>
  findById: (accountId: string) => Promise<Account | null>
}
