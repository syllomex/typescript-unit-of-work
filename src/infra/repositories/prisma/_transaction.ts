import { type Prisma, type PrismaClient } from '@prisma/client'
import { type DefaultArgs } from '@prisma/client/runtime/library'

export type Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>
