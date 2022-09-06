import mongoose from 'mongoose'
import dotenv from 'dotenv'
import offers from './data/offers'
import companies from './data/companies'
import Offer from './models/offerModel'
import Company from './models/companyModel'
import { connectDB } from './config/db'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Offer.deleteMany()
    await Company.deleteMany()

    const createdCompanies = await Company.insertMany(companies)

    offers.forEach(
      (offer) =>
        (offer.company =
          Math.random() > 0.5
            ? String(createdCompanies[0]._id)
            : String(createdCompanies[1]._id))
    )

    await Offer.insertMany(offers)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Offer.deleteMany()
    await Company.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
