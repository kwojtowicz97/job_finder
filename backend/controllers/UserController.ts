import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import { User } from '../models/userModel'
import generateToken from '../utils/generateToken'

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body as {
      name: string
      email: string
      password: string
    }

    const isExistingUser = await User.findOne({ email })

    if (isExistingUser) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(String(user._id)),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
)
