import mongoose from 'mongoose'

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
    tags: { type: [String] },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Company',
    },
  },
  { timestamps: true }
)

const Offer = mongoose.model('Offer', offerSchema)

export default Offer
