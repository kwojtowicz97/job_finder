import dotenv from 'dotenv'
import offers from './data/offers'
import companies, { demoCompany } from './data/companies'
import {
  OfferModel as Offer,
  CompanyModel as Company,
  ReviewModel as Review,
  UserModel as User,
} from './models'
import { connectDB } from './config/db'
import { generateReview, TDummyReview } from './data/reviews'
import { companyCredentials, userCredentials } from './data/users'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Offer.deleteMany()
    await Company.deleteMany()
    await Review.deleteMany()
    await User.deleteMany()

    //Create dummy company
    const { _id: demoCompanyId } = await Company.create(demoCompany)

    //Create dummy users

    const { _id: userId } = await User.create(userCredentials)
    const { _id: companyUserId } = await User.create({
      ...companyCredentials,
      company: demoCompanyId,
    })

    //Create companies

    const createdCompanies = await Company.insertMany(companies)
    console.log(createdCompanies.map((company) => String(company._id)))

    //Create offers and populate with random company

    offers.forEach((offer) => {
      const company =
        createdCompanies[Math.floor(createdCompanies.length * Math.random())]

      offer.company = company._id
      offer.address = company.address || ''
    })

    const createdOffers = await Offer.insertMany(offers)
    console.log(createdOffers.map((offer) => String(offer._id)))

    //Create reviews
    const reviews: TDummyReview[] = []

    createdCompanies.forEach((company) => {
      const numberOfReviews = Math.ceil(Math.random() * 6)
      for (let i = 0; i <= numberOfReviews; i++) {
        reviews.push(generateReview(company._id))
      }
    })

    await Review.insertMany(reviews)

    //Create job applications

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
