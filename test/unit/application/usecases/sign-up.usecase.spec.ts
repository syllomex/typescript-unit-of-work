import { SignUp } from '@/application/usecases'
import { Account, Profile } from '@/domain/entities'
import { mockUow } from 'test/mocks/prisma.uow.mock'

const makeMocks = () => {
  const cryptoService = {
    uuid: vi.fn().mockReturnValue('any-id'),
  }
  const accountRepository = {
    save: vi.fn(),
    transacting: vi.fn(),
  }
  const profileRepository = {
    save: vi.fn(),
    transacting: vi.fn(),
  }
  const uow = mockUow({ accountRepository, profileRepository })
  return { cryptoService, accountRepository, profileRepository, uow }
}

describe('usecases/sign-up', () => {
  // this test should be splitted into another specific tests in correct folders, but I'm leaving it here for study purpose
  it('should inject unit of work transaction into repositories', async () => {
    const { uow, accountRepository, profileRepository, cryptoService } = makeMocks()
    const signUp = new SignUp(uow, cryptoService)

    await signUp.perform({
      email: 'any-email',
      name: 'any-name',
      password: 'any-password',
    })

    expect(uow.transaction).toHaveBeenCalledOnce()
    expect(accountRepository.transacting).toHaveBeenCalledTimes(2)
    expect(accountRepository.transacting).toHaveBeenNthCalledWith(1, uow.transaction)
    expect(accountRepository.transacting).toHaveBeenNthCalledWith(2, null)
    expect(profileRepository.transacting).toHaveBeenCalledTimes(2)
    expect(profileRepository.transacting).toHaveBeenNthCalledWith(1, uow.transaction)
    expect(profileRepository.transacting).toHaveBeenNthCalledWith(2, null)
  })

  it('should call save methods with correct params', async () => {
    const { uow, accountRepository, profileRepository, cryptoService } = makeMocks()
    const signUp = new SignUp(uow, cryptoService)

    const account = await signUp.perform({
      email: 'any-email',
      name: 'any-name',
      password: 'any-password',
    })

    expect(accountRepository.save).toHaveBeenCalledOnce()
    expect(accountRepository.save).toHaveBeenCalledWith({ id: 'any-id', email: 'any-email', password: 'any-password' })
    expect(accountRepository.save).toHaveBeenCalledWith(expect.any(Account))
    expect(profileRepository.save).toHaveBeenCalledOnce()
    expect(profileRepository.save).toHaveBeenCalledWith({
      id: 'any-id',
      accountId: 'any-id',
      name: 'any-name',
      avatarUrl: null,
    })
    expect(profileRepository.save).toHaveBeenCalledWith(expect.any(Profile))
    expect(account).toBeInstanceOf(Account)
    expect(account).toEqual({ id: 'any-id', email: 'any-email', password: 'any-password' })
  })
})
