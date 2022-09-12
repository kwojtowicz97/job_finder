export interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: boolean
  saved: Array<string>
}
