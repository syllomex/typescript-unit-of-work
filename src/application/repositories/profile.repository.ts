import { type Profile } from '@/domain/entities'

export interface ProfileRepository {
  save: (profile: Profile) => Promise<void>
}
