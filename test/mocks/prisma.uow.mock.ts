import { type BaseRepository } from '@/application/repositories/_base.repository'

export const mockUow = (repositories: Record<string, BaseRepository>) => {
  const transaction = vi.fn().mockImplementation(async (fn: (repositories: any) => Promise<any>) => {
    for (const repository of Object.keys(repositories)) {
      repositories[repository].transacting(transaction as any)
    }

    await fn(repositories)

    for (const repository of Object.keys(repositories)) {
      repositories[repository].transacting(null)
    }
  })

  return {
    transaction,
  }
}
