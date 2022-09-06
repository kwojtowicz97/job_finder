import mongoose, { Schema } from 'mongoose'

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: false },
    postalAddress: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    reviews: { type: [String], required: true },
  },
  { timestamps: true }
)

const Company = mongoose.model('Company', companySchema)

export default Company
