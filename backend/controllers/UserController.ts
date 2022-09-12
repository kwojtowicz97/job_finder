import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { CustomRequest } from '../middleware/authHandler'

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

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string
    password: string
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(String(user._id)),
    })
  } else {
    res.status(400)
    throw new Error('Invalid login or password')
  }
})

export const getUserById = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.user?._id)

    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)

export const updateUser = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.user?._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.password = req.body.password || user.password

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
)
