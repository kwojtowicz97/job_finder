// import mongoose, { Schema } from 'mongoose'

import { getModelForClass, prop } from '@typegoose/typegoose'

// const companySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//     image: { type: String, required: false },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     country: { type: String, required: true },
//     description: { type: String, required: false },
//     postalAddress: { type: String, required: false },
//     phoneNumber: { type: String, required: false },
//     reviews: { type: [String], required: true },
//     rating: { type: Number, required: true },
//   },
//   { timestamps: true }
// )

// const Company = mongoose.model('Company', companySchema)

// export default Company

// import { Document, Model, model, Types, Schema } from 'mongoose'

// const CompanySchema = new Schema<CompanyBaseDocument, CompanyModel>({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   description: { type: String, required: true },
//   postalAddress: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   reviews: [{ type: String }],
//   rating: { type: Number, required: true },
// })

// export interface Company {
//   name: string
//   image: string
//   address: string
//   city: string
//   country: string
//   description: string
//   postalAddress: string
//   phoneNumber: string
//   reviews: Array<string>
//   rating: number
// }

// interface CompanyBaseDocument extends Company, Document {
//   reviews: Types.Array<string>
// }

// export interface CompanyModel extends Model<CompanyModel> {}

// // @ts-ignore
// export default model<CompanyBaseDocument, CompanyModel>(
//   'Company',
//   CompanySchema
// )

export class CompanyClass {
  @prop()
  public name?: string

  @prop()
  public image?: string

  @prop()
  public address?: string

  @prop()
  public city?: string

  @prop()
  public country?: string

  @prop()
  public description?: string

  @prop()
  public postalAddress?: string

  @prop()
  public phoneNumber?: string

  @prop()
  public reviews?: string

  @prop()
  public rating?: string
}

export const CompanyModel = getModelForClass(CompanyClass)
