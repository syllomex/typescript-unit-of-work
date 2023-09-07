import { prisma } from '@/infra/lib/prisma'
import { type Transaction } from '@/infra/repositories/prisma/_transaction'
import { type PrismaClient } from '@prisma/client'

export class BaseRepository {
  private tx: Transaction | null = null

  transacting(transaction: Transaction | null): void {
    this.tx = transaction
  }

  /**
   * Unit of Work
   */
  protected get uow(): Transaction | PrismaClient {
    return this.tx ?? prisma
  }
}
