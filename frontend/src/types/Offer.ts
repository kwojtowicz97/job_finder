export interface Offer {
  _id: string
  title: string
  address: string
  contractType: string
  time: string
  experience: string
  salaryMin: number
  salaryMax: number
  tags: Array<string>
  user: string
  company: string
}
