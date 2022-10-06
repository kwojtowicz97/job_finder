import { Review } from '../components/Review'
import { Offer } from './Offer'

export interface Company {
  _id: string
  name: string
  user: string
  image: string
  address: string
  city: string
  country: string
  description: string
  postalAddress?: string
  phoneNumber: string
  reviews: Array<Review>
  rating: number
  offersCount: number
}
