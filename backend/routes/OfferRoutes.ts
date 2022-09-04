import express from 'express'
const router = express.Router()
import { getOffers } from '../controllers/OfferControler'

router.route('/').get(getOffers)

export default router
