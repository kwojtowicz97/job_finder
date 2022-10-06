import asyncHandler from 'express-async-handler'
import { Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { JobApplicationModel, OfferModel } from '../models'
import { isDocument } from '@typegoose/typegoose'

export const createJobApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const jobOffer = await OfferModel.findById(req.params.id)

    const { name, email, phoneNumber, country, city, experience, cvFile } =
      req.body

    if (jobOffer) {
      const jobAppliction = await JobApplicationModel.create({
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
      res.send(jobAppliction)
    } else {
      res.status(400)
      throw new Error('Offer does not found')
    }
  }
)

export const getJobApplications = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const jobApplications = await JobApplicationModel.find({
      company: req.user?.company,
    }).populate('offer')

    res.send(jobApplications)
  }
)

export const updateStateOfJobApplication = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const jobApplication = await JobApplicationModel.findById(
      req.params.id
    ).populate('offer')

    if (!jobApplication) {
      res.status(400)
      throw new Error('Bad request')
    }

    if (!isDocument(jobApplication.offer)) {
      res.status(400)
      throw new Error('Bad request')
    }

    if (!(String(req.user?.company) === String(jobApplication.offer.company))) {
      res.status(401)
      throw new Error('Not authorized')
    }

    jobApplication.status = req.body.status

    const updatedJobApplication = await jobApplication.save()

    if (!updatedJobApplication) {
      res.status(500)
      throw new Error('Internal Server Error')
    }

    res.send(updatedJobApplication)
  }
)
