export class Account {
  id: string
  email: string
  password: string

  constructor(props: { id: string; email: string; password: string }) {
    this.id = props.id
    this.email = props.email
    this.password = props.password
  }
}
