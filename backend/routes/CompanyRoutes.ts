import express from 'express'
const router = express.Router()

import {
  createNewCompany,
  getAllCompanies,
  getCompanies,
  getCompanyById,
  updateCompany,
} from '../controllers/CompanyController'
import { protect } from '../middleware/authHandler'

router.route('/all').get(getAllCompanies)
router.route('/:id').get(getCompanyById).put(protect, updateCompany)
router.route('/').post(protect, createNewCompany).get(getCompanies)

export default router
