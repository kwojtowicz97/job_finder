import { Company } from './Company'
import { JobApplication } from './JobApplication'

export interface Offer {
  _id: string
  title: string
  city: string
  address: string
  localization: string
  contractType: string
  time: string
  experience: string
  salaryMin?: number
  salaryMax?: number
  responsibilities: Array<string>
  requirements: Array<string>
  benefits: Array<string>
  tags: Array<string>
  company: Company
  expiresAt: Date
  expiresIn: number
  createdAt: Date
  updatedAt: Date
  jobApplications: JobApplication[]
}
