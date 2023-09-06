export class Profile {
  id: string
  accountId: string
  name: string
  avatarUrl: string | null

  constructor(props: { id: string; accountId: string; name: string; avatarUrl?: string | null }) {
    this.id = props.id
    this.accountId = props.accountId
    this.name = props.name
    this.avatarUrl = props.avatarUrl ?? null
  }
}
