import express from 'express'
const router = express.Router()
import { createJobApplication } from '../controllers/JobApplicationControler'

router.route('/:id').get(createJobApplication)

export default router
