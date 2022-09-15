import { Schema, model, InferSchemaType, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { generateKey } from 'crypto'
import generateToken from '../utils/generateToken'

export interface SendUserData {
  _id: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  isAdmin: boolean
  saved: Array<string>
  token: string
}

export interface IUser {
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  address: string
  isAdmin?: boolean
  saved: Array<string>
  password: string
  matchPassword: (password: string) => Promise<Boolean>
  toJSON: (this: typeof userSchema) => SendUserData
}

export interface IUserMethods {
  matchPasswords(
    this: typeof userSchema,
    enteredPassword: string
  ): Promise<boolean>
  toJSON(this: typeof userSchema): SendUserData
}

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    saved: Array<string>,
    isAdmin: Boolean,
  },
  { timestamps: true }
)

userSchema.method(
  'matchPassword',
  async function matchPasswords(this: any, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
)

userSchema.method('toJSON', function toJSON(this: any) {
  const obj = this.toObject()
  return {
    _id: obj._id,
    name: obj.name,
    email: obj.email,
    phoneNumber: obj.phoneNumber,
    country: obj.country,
    city: obj.city,
    adderss: obj.adderss,
    isAdmin: obj.isAdmin,
    saved: obj.saved,
    token: generateToken(obj._id),
  }
})

userSchema.pre('save', async function (this, next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
})

export type UserDocument = InferSchemaType<typeof userSchema>

export const User = model<IUser, UserModel>('User', userSchema)
