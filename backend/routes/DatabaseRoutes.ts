import express from 'express'
import { resetDatabase } from '../controllers/DatabaseController'
const router = express.Router()

router.route('/').post(resetDatabase)

export default router
