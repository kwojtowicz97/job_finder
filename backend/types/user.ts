import { Document } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  isAdmin?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserDocument extends Document {}
