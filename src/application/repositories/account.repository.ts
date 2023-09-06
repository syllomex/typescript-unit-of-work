import { type Account } from '@/domain/entities'

export interface AccountRepository {
  save: (account: Account) => Promise<void>
}
