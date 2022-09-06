export interface Company {
  name: string
  user: string
  image: string
  address: string
  city: string
  country: string
  description?: string
  postalAddress?: string
  phoneNumber?: string
  reviews: Array<string>
}
