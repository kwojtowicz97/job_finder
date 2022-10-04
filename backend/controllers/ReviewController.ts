import asyncHandler from 'express-async-handler'
import { Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { CompanyModel } from '../models/companyModel'
import { ReviewModel } from '../models/reviewModel'

export const createReview = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const company = await CompanyModel.findById(req.params.id)

    console.log(req.params.id)

    if (!company) {
      throw new Error('Company not found')
    }

    if (company.reviews?.some((review) => review === req.user?._id)) {
      throw new Error('You can only add one review')
    }

    if (
      req.user?._id &&
      req.body.reviewContents &&
      req.body.rating &&
      company.reviews
    ) {
      const createdReview = await ReviewModel.create({
        user: req.user._id,
        company: company._id,
        contents: req.body.reviewContents,
        rating: req.body.rating,
      })
      company.reviews?.push(createdReview._id)
      const savedCompany = await company.save()
      console.log(savedCompany)
      res.send(savedCompany)
    }
  }
)
