import { Document } from 'mongoose'

export interface IUser {
  name: string
  email: string
  password: string
  isAdmin?: boolean
  createdAt: Date
  updatedAt: Date
  matchPassword: (password: string) => Promise<Boolean>
}

export interface UserDocument extends IUser, Document {}
