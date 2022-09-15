import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { JobApplication } from '../models/jobApplicationModel'
import { User } from '../models/userModel'
import Offer from '../models/offerModel'
import { ObjectId } from 'mongoose'

export const createJobApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const jobOffer = await Offer.findById(req.params.id)

    const { name, email, phoneNumber, country, city, experience, cvFile } =
      req.body

    if (jobOffer) {
      const jobAppliction = await JobApplication.create({
        offer: jobOffer._id,
        user: req.user!._id,
        name,
        email,
        phoneNumber,
        country,
        city,
        experience,
        cvFile,
      })
      res.status(201)
      res.send(jobOffer)
    } else {
      res.status(400)
      throw new Error('Offer does not found')
    }
  }
)
