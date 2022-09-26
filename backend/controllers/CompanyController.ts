import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'
import { Company, CompanyModel } from '../models/companyModel'
import { User, UserModel } from '../models/userModel'
import mongoose from 'mongoose'

export const getCompanyById = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await CompanyModel.findById(req.params.id)

    if (company) {
      res.status(201)
      res.json(company)
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
