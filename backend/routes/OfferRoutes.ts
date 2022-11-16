import express from 'express'
const router = express.Router()
import {
  getOffers,
  getOfferById,
  createOffer,
  getAllOffers,
} from '../controllers/OfferController'
import { protect } from '../middleware/authHandler'

router.route('/').get(getOffers).post(protect, createOffer)
router.route('/all').get(getAllOffers)
router.route('/:id').get(getOfferById)

export default router
