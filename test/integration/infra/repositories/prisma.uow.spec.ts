import { Account, Profile } from '@/domain/entities'
import { prisma } from '@/infra/lib/prisma'
import { makeAccountRepository, makeProfileRepository, makeUnitOfWork } from '@/main/factories/infra/repositories'
import { randomUUID } from 'crypto'

describe('repositories/prisma.unit-of-work', () => {
  const clear = async () => {
    await prisma.profile.deleteMany()
    await prisma.account.deleteMany()
  }

  beforeEach(clear)
  afterAll(clear)

  it('should rollback changes when an error is thrown', async () => {
    const accountRepository = makeAccountRepository()
    const profileRepository = makeProfileRepository()
    const uow = makeUnitOfWork(accountRepository, profileRepository)

    const account = new Account({
      id: randomUUID(),
      email: 'email@email.com',
      password: '12345678',
    })

    await expect(
      uow.transaction(async () => {
        await accountRepository.save(account)
        throw new Error('test')
      }),
    ).rejects.toThrowError()

    const createdAccount = await prisma.account.findUnique({ where: { id: account.id } })
    expect(createdAccount).toBe(null)
  })

  it('should commit changes if no error is thrown', async () => {
    const accountRepository = makeAccountRepository()
    const profileRepository = makeProfileRepository()
    const uow = makeUnitOfWork(accountRepository, profileRepository)

    const account = new Account({
      id: randomUUID(),
      email: 'email@email.com',
      password: '12345678',
    })
    const profile = new Profile({
      id: randomUUID(),
      name: 'name',
      accountId: account.id,
    })

    const result = await uow.transaction(async () => {
      await accountRepository.save(account)
      await profileRepository.save(profile)
      return account
    })

    const createdAcount = await prisma.account.findUnique({ where: { id: account.id } })
    expect(result).toEqual(account)
    expect(createdAcount).toBeDefined()
    expect(createdAcount?.id === account.id)
  })

  it('should commit changes automatically when not using unit of work', async () => {
    const accountRepository = makeAccountRepository()

    const account = new Account({
      id: randomUUID(),
      email: 'email@email.com',
      password: '12345678',
    })

    await accountRepository.save(account)
    const created = await accountRepository.findById(account.id)
    const nonExisting = await accountRepository.findById('any-id')

    expect(created).toEqual(account)
    expect(nonExisting).toBe(null)
  })
})
