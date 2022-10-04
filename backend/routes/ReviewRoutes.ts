import express from 'express'
const router = express.Router()
import { createReview } from '../controllers/ReviewController'
import { protect } from '../middleware/authHandler'

router.route('/:id').post(protect, createReview)

export default router
