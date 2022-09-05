export interface Company {
  name: string
  user: string
  address: string
  city: string
  country: string
  description?: string
  postalAddress?: string
  phoneNumber?: string
  reviews: Array<string>
}
