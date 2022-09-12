import { Schema, model, InferSchemaType, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string
  email: string
  password: string
  isAdmin?: boolean
  // createdAt: Date
  // updatedAt: Date
  matchPassword: (password: string) => Promise<Boolean>
}

export interface IUserMethods {
  matchPasswords(
    this: typeof userSchema,
    enteredPassword: string
  ): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    // createdAt: Date,
    // updatedAt: Date,
  },
  { timestamps: true }
)

userSchema.method(
  'matchPassword',
  async function matchPasswords(this: any, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
)

userSchema.pre('save', async function (this, next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
})

export type UserDocument = InferSchemaType<typeof userSchema>

export const User = model<IUser, UserModel>('User', userSchema)
