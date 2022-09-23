// import mongoose, { Schema, model, InferSchemaType, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
// import generateToken from '../utils/generateToken'

// export interface SendUserData {
//   _id: string
//   name: string
//   email: string
//   phoneNumber: string
//   country: string
//   city: string
//   address: string
//   isAdmin: boolean
//   saved: Array<string>
//   token: string
// }

// export interface IUser {
//   _id: mongoose.Types.ObjectId
//   name: string
//   email: string
//   phoneNumber: string
//   country: string
//   city: string
//   address: string
//   isAdmin?: boolean
//   saved: Array<string>
//   password: string
//   company?: mongoose.Types.ObjectId
//   matchPassword: (password: string) => Promise<Boolean>
//   toJSON: (this: typeof userSchema) => SendUserData
// }

// export interface IUserMethods {
//   matchPasswords(
//     this: typeof userSchema,
//     enteredPassword: string
//   ): Promise<boolean>
//   toJSON(this: typeof userSchema): SendUserData
// }

// type UserModel = Model<IUser, {}, IUserMethods>

// const userSchema = new Schema<IUser, UserModel, IUserMethods>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     country: { type: String, required: true },
//     city: { type: String, required: true },
//     address: { type: String, required: true },
//     company: { type: mongoose.Types.ObjectId },
//     saved: Array<string>,
//     isAdmin: Boolean,
//   },
//   { timestamps: true }
// )

// userSchema.method(
//   'matchPassword',
//   async function matchPasswords(this: any, enteredPassword: string) {
//     return await bcrypt.compare(enteredPassword, this.password)
//   }
// )

// userSchema.method('toJSON', function toJSON(this: any) {
//   const obj = this.toObject()
//   return {
//     _id: obj._id,
//     name: obj.name,
//     email: obj.email,
//     phoneNumber: obj.phoneNumber,
//     country: obj.country,
//     city: obj.city,
//     address: obj.address,
//     isAdmin: obj.isAdmin,
//     saved: obj.saved,
//     token: generateToken(obj._id),
//   }
// })

// userSchema.pre('save', async function (this, next) {
//   if (!this.isModified('password')) next()
//   this.password = await bcrypt.hash(this.password, 10)
// })

// export type UserDocument = InferSchemaType<typeof userSchema>

// export const User = model<IUser, UserModel>('User', userSchema)

import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { Document, Model, model, Types, Schema, Query } from 'mongoose'
import { CompanyClass } from './companyModel'
import generateToken from '../utils/generateToken'

// export interface User {
//   name: string
//   email: string
//   phoneNumber: string
//   country: string
//   city: string
//   address: string
//   isAdmin?: boolean
//   saved: Array<string>
//   password: string
//   company?: Types.ObjectId | Record<string, unknown>
// }

// interface UserBaseDocument extends User, Document {
//   saved: Types.Array<string>
// }

// export interface UserDocument extends UserBaseDocument {
//   company: Company['_id']
// }

// export interface UserPopulateDocument extends UserBaseDocument {
//   company: Company
// }

@pre<UserClass>('save', async function (this, next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password!, 10)
})
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class UserClass {
  @prop()
  public name?: string

  @prop()
  public email?: string

  @prop()
  public phoneNumber?: string

  @prop()
  public country?: string

  @prop()
  public city?: string

  @prop()
  public address?: string

  @prop()
  public isAdmin?: boolean

  @prop({ type: () => Array<string>, required: false, default: [] })
  public saved?: Array<string>

  @prop()
  public password?: string

  @prop()
  public company?: Ref<CompanyClass>

  public async matchPassword(
    this: DocumentType<UserClass>,
    enteredPassword: string
  ) {
    return await bcrypt.compare(enteredPassword, this.password!)
  }

  public async toJSON(this: DocumentType<UserClass>) {
    const obj = this.toObject()
    return {
      _id: obj._id,
      name: obj.name,
      email: obj.email,
      phoneNumber: obj.phoneNumber,
      country: obj.country,
      city: obj.city,
      address: obj.address,
      isAdmin: obj.isAdmin,
      saved: obj.saved,
      token: generateToken(String(obj._id)),
    }
  }
}

export const UserModel = getModelForClass(UserClass)
