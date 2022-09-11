import express from 'express'
const router = express.Router()
import { authUser, registerUser } from '../controllers/UserController'

router.route('/').post(registerUser)
router.route('/login').post(authUser)

export default router
