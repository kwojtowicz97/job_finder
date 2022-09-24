import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import { OfferModel as Offer } from '../models/offerModel'

// @desc    Fetch all offers
// @route   GET /api/products
// @access  Public
export const getOffers = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Offer.countDocuments({ ...keyword })
  const offers = await Offer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('company', 'name image rating')

  res.json({ offers, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch offer by Id
// @route   GET /api/products/:id
// @access  Public
export const getOfferById = asyncHandler(
  async (req: Request, res: Response) => {
    const offer = await Offer.findById(req.params.id).populate('company')

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
