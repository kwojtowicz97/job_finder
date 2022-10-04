import asyncHandler from 'express-async-handler'
import { application, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import JobApplication from '../models/jobApplicationModel'
import { JobApplication as TJobApplication } from '../models/jobApplicationModel'
import {
  OfferClass,
  OfferModel as Offer,
  OfferModel,
} from '../models/offerModel'
import JobApplicationModel from '../models/jobApplicationModel'
import { CompanyModel } from '../models/companyModel'
import mongoose from 'mongoose'

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
