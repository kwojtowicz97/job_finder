import mongoose, { ObjectId } from 'mongoose'

export interface IOffer extends mongoose.Document {
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
  company: ObjectId
  expiresAt: Date
  expiresIn: string
  createdAt: Date
  updatedAt: Date
}

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    contractType: { type: String, required: true },
    time: { type: String, required: true },
    experience: { type: String, required: true },
    salaryMin: { type: Number, required: false },
    salaryMax: { type: Number, required: false },
    responsibilities: { type: [String], required: true },
    requirements: { type: [String], required: true },
    benefits: { type: [String], required: true },
    tags: { type: [String], required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Company',
    },
    expiresAt: { type: Date, required: true },
    expiresIn: { type: String, required: true },
  },
  { timestamps: true }
)

const Offer = mongoose.model<IOffer>('Offer', offerSchema)
export default Offer
