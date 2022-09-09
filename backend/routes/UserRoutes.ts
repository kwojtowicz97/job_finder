import express from 'express'
const router = express.Router()
import { registerUser } from '../controllers/UserController'

router.route('/').post(registerUser)

export default router
