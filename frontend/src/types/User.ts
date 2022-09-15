export interface UserInfo {
  _id: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  isAdmin: boolean
  token: boolean
  saved: Array<string>
}
