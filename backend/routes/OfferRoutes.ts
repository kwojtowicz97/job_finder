import express from 'express'
const router = express.Router()
import { getOffers, getOfferById } from '../controllers/OfferController'

router.route('/').get(getOffers)
router.route('/:id').get(getOfferById)

export default router
