import express from 'express'
const router = express.Router()

import { getCompanyById } from '../controllers/CompanyController'

router.route('/:id').get(getCompanyById)

export default router
