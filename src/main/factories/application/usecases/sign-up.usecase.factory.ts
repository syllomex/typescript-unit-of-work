import { SignUp } from '@/application/usecases'
import { makeAccountRepository, makeProfileRepository, makeUnitOfWork } from '@/main/factories/infra/repositories'
import { makeCryptoService } from '@/main/factories/infra/services'

export const makeSignUp = () => {
  const accountRepository = makeAccountRepository()
  const profileRepository = makeProfileRepository()
  const cryptoService = makeCryptoService()

  const uow = makeUnitOfWork(accountRepository, profileRepository)

  return new SignUp(uow, accountRepository, profileRepository, cryptoService)
}
