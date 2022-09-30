import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Review } from './reviewModel'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Company {
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

  @prop({ ref: () => Review })
  public reviews!: Ref<Review>[]

  @prop()
  public rating?: string
}

export const CompanyModel = getModelForClass(Company)
