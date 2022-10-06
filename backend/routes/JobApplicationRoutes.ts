import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authHandler'
import {
  createJobApplication,
  getJobApplications,
  updateStateOfJobApplication,
} from '../controllers/JobApplicationControler'

router
  .route('/:id')
  .post(protect, createJobApplication)
  .put(protect, updateStateOfJobApplication)
router.route('/').get(protect, getJobApplications)

export default router
