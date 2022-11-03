import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  updateUser,
  getUserById,
  addToFavourite,
  getUserCvData,
} from '../controllers/UserController'
import { protect } from '../middleware/authHandler'

router
  .route('/')
  .post(registerUser)
  .get(protect, getUserById)
  .put(protect, updateUser)
router.route('/login').post(authUser)
router.route('/favourites/:id').put(protect, addToFavourite)
router.route('/cvData').get(protect, getUserCvData)

export default router
