import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authHandler'
import { createJobApplication } from '../controllers/JobApplicationControler'

router.route('/:id').post(protect, createJobApplication)

export default router
