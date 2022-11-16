import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CompanyModel, OfferModel } from '../models'
import { CustomRequest } from '../middleware/authHandler'

// @desc    Fetch all offers
// @route   GET /api/products
// @access  Public
export const getOffers = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1

  const position = req.query.position
    ? {
        title: {
          $regex: req.query.position,
          $options: 'i',
        },
      }
    : {}

  const location = req.query.location
    ? {
        address: {
          $regex: req.query.location,
          $options: 'i',
        },
      }
    : {}

  try {
    const count = await OfferModel.countDocuments({ ...position, ...location })
    const offers = await OfferModel.find({ ...position, ...location })
      .sort({ createdAt: 'descending' })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate({ path: 'company', populate: { path: 'reviews' } })

    offers.forEach((offer) => {
      const hours =
        (new Date(offer.expiresAt!).getTime() - new Date().getTime()) / 3600000

      offer.expiresIn = hours
    })

    res.json({ offers, page, pages: Math.ceil(count / pageSize) })
  } catch (error) {
    res.send(error)
  }
})

// @desc    Fetch offer by Id
// @route   GET /api/products/:id
// @access  Public
export const getOfferById = asyncHandler(
  async (req: Request, res: Response) => {
    const offer = await OfferModel.findById(req.params.id).populate({
      path: 'company',
      populate: { path: 'reviews' },
    })

    if (offer && offer.expiresAt instanceof Date) {
      const hours =
        (new Date(offer.expiresAt).getTime() - new Date().getTime()) / 3600000

      offer.expiresIn = hours
      res.json(offer)
    } else {
      res.status(404)
      throw new Error('Offer not found')
    }
  }
)

export const createOffer = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const userCompany = await CompanyModel.findById(req.user?.company)
    if (userCompany) {
      const {
        body: {
          title,
          address,
          contractType,
          time,
          experience,
          responsibilities,
          requirements,
          benefits,
          expiresAt,
        },
      } = req

      const newOffer = await OfferModel.create({
        title,
        address,
        contractType,
        time,
        experience,
        responsibilities,
        requirements,
        benefits,
        expiresAt,
        company: userCompany._id,
      })

      res.send(newOffer)
    } else {
      res.status(401)
      throw new Error("Company didn't found")
    }
  }
)

export const getAllOffers = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const offers = await OfferModel.find({})
        .sort({ createdAt: 'descending' })
        .populate({ path: 'company', populate: { path: 'reviews' } })

      offers.forEach((offer) => {
        const hours =
          (new Date(offer.expiresAt!).getTime() - new Date().getTime()) /
          3600000

        offer.expiresIn = hours
      })

      res.json({ offers })
    } catch (error) {
      res.send(error)
    }
  }
)
