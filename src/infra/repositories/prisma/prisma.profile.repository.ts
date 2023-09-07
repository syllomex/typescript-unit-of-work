import { type ProfileRepository } from '@/application/repositories'
import { type Profile } from '@/domain/entities'
import { BaseRepository } from '@/infra/repositories/prisma/_prisma.base.repository'

export class PrismaProfileRepository extends BaseRepository implements ProfileRepository {
  async save(profile: Profile): Promise<void> {
    await this.uow.profile.create({
      data: profile,
      select: { id: true },
    })
  }
}
