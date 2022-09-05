import express from 'express'
const router = express.Router()
import { getOffers, getOfferById } from '../controllers/OfferControler'

router.route('/').get(getOffers)
router.route('/:id').get(getOfferById)

export default router
