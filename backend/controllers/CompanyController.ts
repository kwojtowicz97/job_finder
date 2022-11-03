import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { CompanyModel, OfferModel, UserModel } from '../models'

export const getCompanyById = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await CompanyModel.findById(req.params.id).populate(
      'reviews'
    )

    if (company) {
      const offers = await OfferModel.find({ company: company._id }).populate({
        path: 'company',
        populate: { path: 'reviews' },
      })

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
    const company = await CompanyModel.findById(req.user?.company).populate(
      'reviews'
    )

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

export const getAllCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1

    const companySearch = req.query.company
      ? {
          name: {
            $regex: req.query.company,
            $options: 'i',
          },
        }
      : {}

    const locationSearch = req.query.location
      ? {
          $or: [
            { address: req.query.location },
            { city: req.query.location },
            { country: req.query.location },
          ],
        }
      : {}
    const count = await CompanyModel.countDocuments({
      ...companySearch,
      ...locationSearch,
    })
    const companies = await CompanyModel.find({
      ...companySearch,
      ...locationSearch,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('offersCount')
      .populate('reviews')

    res.send({ companies, page, pages: Math.ceil(count / pageSize) })
  }
)
