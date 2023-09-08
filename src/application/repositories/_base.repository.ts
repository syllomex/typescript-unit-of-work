// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class BaseRepository {
  abstract transacting(client: unknown): void
}

export type RepositoryPick<T extends BaseRepository, K extends keyof T> = Pick<T, K | 'transacting'>
