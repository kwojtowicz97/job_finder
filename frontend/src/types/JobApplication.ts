import { Status } from '../components/JobApplication'
import { Review } from '../components/Review'
import { Offer } from './Offer'

export interface JobApplication {
  _id: string
  offer: Offer
  user: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  experience: string
  cvFile: string
  status: Status
}
