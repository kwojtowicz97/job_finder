import express from 'express'
const router = express.Router()

import {
  createNewCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from '../controllers/CompanyController'
import { protect } from '../middleware/authHandler'

router.route('/:id').get(getCompanyById).put(protect, updateCompany)
router.route('/').post(protect, createNewCompany).get(getAllCompanies)

export default router
