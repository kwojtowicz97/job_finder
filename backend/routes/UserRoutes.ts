import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  updateUser,
  getUserById,
} from '../controllers/UserController'
import { protect } from '../middleware/authHandler'

router
  .route('/')
  .post(registerUser)
  .get(protect, getUserById)
  .put(protect, updateUser)
router.route('/login').post(authUser)

export default router
