import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CompanyModel } from '../models/companyModel'

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
