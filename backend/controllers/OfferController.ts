import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { OfferModel } from '../models'

// @desc    Fetch all offers
// @route   GET /api/products
// @access  Public
export const getOffers = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10
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

  const count = await OfferModel.countDocuments({})
  const offers = await OfferModel.find({ ...position, ...location })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate({ path: 'company', populate: { path: 'reviews' } })

  res.json({ offers, page, pages: Math.ceil(count / pageSize) })
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

      offer.expiresIn =
        hours < 24
          ? `${Math.round(hours)} hours`
          : `${Math.round(hours / 24)} days`
      res.json(offer)
    } else {
      res.status(404)
      throw new Error('Offer not found')
    }
  }
)
