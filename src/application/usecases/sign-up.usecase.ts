import { type AccountRepository, type ProfileRepository, type UnitOfWork } from '@/application/repositories'
import { type RepositoryPick } from '@/application/repositories/_base.repository'
import { type CryptoService } from '@/application/services'
import { Account, Profile } from '@/domain/entities'

export class SignUp {
  constructor(
    private readonly uow: UnitOfWork<{
      accountRepository: RepositoryPick<AccountRepository, 'save'>
      profileRepository: RepositoryPick<ProfileRepository, 'save'>
    }>,
    private readonly cryptoService: CryptoService,
  ) {}

  async perform(input: { email: string; password: string; name: string; avatarUrl?: string | null }) {
    const account = new Account({
      id: this.cryptoService.uuid(),
      email: input.email,
      password: input.password,
    })

    const profile = new Profile({
      id: this.cryptoService.uuid(),
      accountId: account.id,
      avatarUrl: input.avatarUrl,
      name: input.name,
    })

    await this.uow.transaction(async ({ accountRepository, profileRepository }) => {
      await accountRepository.save(account)
      await profileRepository.save(profile)
    })

    return account
  }
}
