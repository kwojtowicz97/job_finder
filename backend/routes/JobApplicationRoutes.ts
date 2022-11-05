import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authHandler'
import {
  createJobApplication,
  getJobApplications,
  getReceivedJobApplications,
  getSendJobApplications,
  updateStateOfJobApplication,
} from '../controllers/JobApplicationControler'

router
  .route('/received-job-applications')
  .get(protect, getReceivedJobApplications)
router
  .route('/:id')
  .post(protect, createJobApplication)
  .put(protect, updateStateOfJobApplication)
  .get(protect, getJobApplications)
router.route('/').get(protect, getSendJobApplications)

export default router
