export type Transaction = unknown

export interface UnitOfWork {
  transaction: <T = unknown>(fn: () => Promise<T>) => Promise<T>
}
