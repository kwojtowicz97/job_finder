import mongoose from 'mongoose'
import dotenv from 'dotenv'
import offers from './data/offers'
import Offer from './models/offerModel'
import { connectDB } from './config/db'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Offer.deleteMany()

    const createdOffers = await Offer.insertMany(offers)


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