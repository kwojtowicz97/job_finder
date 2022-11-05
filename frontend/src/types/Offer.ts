import { Company } from './Company'
import { JobApplication } from './JobApplication'

export interface Offer {
  _id: string
  title: string
  address: string
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
  expiresIn: string
  createdAt: Date
  updatedAt: Date
  jobApplications: JobApplication[]
}
