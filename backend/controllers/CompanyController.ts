import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { CompanyModel } from '../models/companyModel'
import { UserModel } from '../models/userModel'
import { OfferModel } from '../models/offerModel'
import { ReviewModel } from '../models/reviewModel'

export const getCompanyById = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await CompanyModel.findById(req.params.id).populate(
      'reviews'
    )

    if (company) {
      const offers = await OfferModel.find({ company: company._id }).populate(
        'company'
      )

      res.status(201)
      res.json({
        company,
        offers,
      })
    } else {
      throw new Error('Company not found')
    }
  }
)

export const createNewCompany = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (req.user?._id && (await CompanyModel.findById(req.user.company))) {
      throw new Error('User has already created a company')
    }

    const { name, country, city, address, phoneNumber, image, description } =
      req.body as {
        name: string
        country: string
        city: string
        address: string
        phoneNumber: string
        image: string | undefined
        description: string | undefined
      }
    const company = await CompanyModel.create({
      // user: req.user?._id,
      name,
      country,
      city,
      address,
      phoneNumber,
      image,
      description,
    })

    if (company) {
      const user = await UserModel.findById(req.user?._id)
      console.log(user)
      if (user) {
        user.company = company._id
        await user.save()
      }
    }
    res.send(company)
  }
)

export const updateCompany = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.user!.company) {
      throw new Error("User doesn't have a company")
    }
    const company = await CompanyModel.findById(req.user?.company)

    if (company) {
      company.name = req.body.name || company.name
      company.image = req.body.image || company.image
      company.address = req.body.address || company.address
      company.city = req.body.city || company.city
      company.country = req.body.country || company.country
      company.description = req.body.description || company.description
      company.postalAddress = req.body.postalAddress || company.postalAddress
      company.phoneNumber = req.body.phoneNumber || company.phoneNumber

      const updatedCompany = await company.save()

      res.send(updatedCompany)
    } else {
      res.status(404)
      throw new Error('Company not found')
    }
  }
)

export const createReview = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const company = await CompanyModel.findById(req.params.id)

    if (!company) {
      throw new Error('Company not found')
    }

    if (company.reviews?.some((review) => review === req.user?._id)) {
      throw new Error('You can only add one review')
    }

    if (
      req.user?._id &&
      req.body.contents &&
      req.body.rating &&
      company.reviews
    ) {
      const createdReview = await ReviewModel.create({
        company: company._id,
        contents: req.body.contents,
        rating: req.body.rating,
      })
      company.reviews?.push(createdReview._id)
      const savedCompany = await company.save()
      res.send(savedCompany)
    }
  }
)
