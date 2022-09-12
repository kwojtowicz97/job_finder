import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User } from '../models/userModel'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ObjectId } from 'bson'
import mongoose from 'mongoose'

interface Decoded {
  id: string
}

export interface CustomRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    isAdmin?: boolean
  }
}

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const secret = process.env.SECRET_KEY!

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret) as Decoded
        const user = await User.findById(decoded.id)
        if (user) req.user = user
        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not authorized')
      }
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }
)