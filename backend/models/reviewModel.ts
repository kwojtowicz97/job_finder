import { modelOptions, prop, Ref, Severity } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Company } from './companyModel'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Review {
  @prop()
  public user!: mongoose.Types.ObjectId

  @prop({ ref: () => Company })
  public company!: Ref<Company>

  @prop()
  public contents!: string

  @prop()
  public rating!: number
}
