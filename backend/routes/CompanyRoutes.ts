import express from 'express'
const router = express.Router()

import {
  createNewCompany,
  getCompanyById,
} from '../controllers/CompanyController'
import { protect } from '../middleware/authHandler'

router.route('/:id').get(getCompanyById)
router.route('/').post(protect, createNewCompany)

export default router
