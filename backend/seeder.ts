import offers, { offersForDummyCompany } from './data/offers'
import companies, { demoCompany } from './data/companies'
import {
  OfferModel as Offer,
  CompanyModel as Company,
  ReviewModel as Review,
  UserModel as User,
  JobApplicationModel as JobApplication,
} from './models'
import { generateReview, TDummyReview } from './data/reviews'
import { companyCredentials, userCredentials } from './data/users'
import {
  generateApplication,
  getRandomExperience,
  getRandomStatus,
  TDummyJobAppliaction,
} from './data/jobApplications'

export const importData = async () => {
  console.log('dataimport')
  try {
    await Offer.deleteMany()
    await Company.deleteMany()
    await Review.deleteMany()
    await User.deleteMany()
    await JobApplication.deleteMany()

    //Create dummy company
    const dummyCompany = await Company.create(demoCompany)

    //Create dummy user

    const demoUser = await User.create(userCredentials)
    const { _id: companyUserId } = await User.create({
      ...companyCredentials,
      company: dummyCompany._id,
    })

    //Create dummy offers for dummy company

    offersForDummyCompany.forEach((offer) => {
      const company = dummyCompany

      offer.company = company._id
      offer.address = company.address || ''
      offer.city = company.city || ''
    })

    const createdOffersForDummyCompany = await Offer.insertMany(
      offersForDummyCompany
    )

    //Create dummy applications for dummy offers

    const jobApplications: TDummyJobAppliaction[] = []

    createdOffersForDummyCompany.forEach((offer) => {
      const numberOfApplications = Math.ceil(Math.random() * 6)
      for (let i = 0; i <= numberOfApplications; i++) {
        jobApplications.push(
          generateApplication('6376c96f3e21d9b4aaa6e9e5', offer._id)
        )
      }
    })

    await JobApplication.insertMany(jobApplications)

    //Create companies

    const createdCompanies = await Company.insertMany(companies)

    //Create offers and populate with random company

    offers.forEach((offer) => {
      const company =
        createdCompanies[Math.floor(createdCompanies.length * Math.random())]

      offer.company = company._id
      offer.address = company.address || ''
      offer.city = company.city || ''
    })

    const createdOffers = await Offer.insertMany(offers)

    //Create dummy applications for demo offers

    const jobApplicationsSendByDummyUser: TDummyJobAppliaction[] = []

    createdOffers.forEach((offer, index) => {
      if (index % 3 !== 0) return
      jobApplicationsSendByDummyUser.push({
        offer: offer._id,
        user: demoUser._id,
        email: demoUser.email!,
        address: demoUser.address!,
        city: demoUser.city!,
        country: demoUser.country!,
        cvFile: '/uploads/demoUserCv',
        experience: getRandomExperience(),
        name: demoUser.name!,
        phoneNumber: demoUser.phoneNumber!,
        status: getRandomStatus(),
      })
    })

    await JobApplication.insertMany(jobApplicationsSendByDummyUser)

    //Create reviews
    const reviews: TDummyReview[] = []

    createdCompanies.forEach((company) => {
      const numberOfReviews = Math.ceil(Math.random() * 6)
      for (let i = 0; i <= numberOfReviews; i++) {
        reviews.push(generateReview(company._id))
      }
    })

    await Review.insertMany(reviews)

    console.log('Data Imported!')
    // process.exit(0)
  } catch (error) {
    console.error(`${error}`)
    // process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Offer.deleteMany()
    await Company.deleteMany()

    console.log('Data Destroyed!')
  } catch (error) {
    console.error(`${error}`)
  }
}

// if (process.argv[2] === '-d') {
//   destroyData()
// } else {
//   importData()
// }
