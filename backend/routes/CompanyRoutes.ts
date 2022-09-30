import express from 'express'
const router = express.Router()

import {
  createNewCompany,
  getCompanyById,
  updateCompany,
} from '../controllers/CompanyController'
import { protect } from '../middleware/authHandler'

router.route('/:id').get(getCompanyById).put(protect, updateCompany)
router.route('/').post(protect, createNewCompany)

export default router
