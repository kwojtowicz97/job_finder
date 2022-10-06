import asyncHandler from 'express-async-handler'
import { Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { CompanyModel, ReviewModel } from '../models'

export const createReview = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const company = await CompanyModel.findById(req.params.id)

    if (!company) {
      throw new Error('Company not found')
    }

    if (req.user?._id && req.body.reviewContents && req.body.rating) {
      const createdReview = await ReviewModel.create({
        user: req.user._id,
        company: company._id,
        contents: req.body.reviewContents,
        rating: req.body.rating,
      })

      res.send(createdReview)
    }
  }
)
