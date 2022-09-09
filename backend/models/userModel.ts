import { Schema, model, Document, ObjectId } from 'mongoose'
import { IUser } from '../types/user'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
})

userSchema.methods.matchPassword = async function matchPasswords(
  this: any,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (this, next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
})

export const User = model<IUser>('User', userSchema)
