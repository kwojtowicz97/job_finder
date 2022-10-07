import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authHandler'
import {
  createJobApplication,
  getJobApplications,
  getSendJobApplications,
  updateStateOfJobApplication,
} from '../controllers/JobApplicationControler'

router
  .route('/:id')
  .post(protect, createJobApplication)
  .put(protect, updateStateOfJobApplication)
  .get(protect, getSendJobApplications)
router.route('/').get(protect, getJobApplications)

export default router
