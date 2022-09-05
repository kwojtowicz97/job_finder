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

    const createdOffers = await Offer.insertMany(offers)
    const createdCompanies = await Company.insertMany(companies)

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
