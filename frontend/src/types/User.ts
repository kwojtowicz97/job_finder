import { Company } from './Company'

export interface UserInfo {
  _id: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  isAdmin: boolean
  cvPath?: string
  token: boolean
  saved: Array<string>
  company?: Company
}
