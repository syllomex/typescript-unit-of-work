import { type BaseRepository } from '@/application/repositories/_base.repository'
import { type Profile } from '@/domain/entities'

export interface ProfileRepository extends BaseRepository {
  save: (profile: Profile) => Promise<void>
}
