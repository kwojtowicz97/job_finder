import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { User } from './userModel'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Review {
  @prop()
  public user?: mongoose.Types.ObjectId

  @prop()
  public contents?: string

  @prop()
  public rating?: number
}

export const ReviewModel = getModelForClass(Review)
