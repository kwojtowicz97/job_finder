import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { Company } from './companyModel'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class OfferClass {
  @prop()
  public title?: string

  @prop()
  public address?: string

  @prop()
  public contractType?: string

  @prop()
  public time?: string

  @prop()
  public experience?: string

  @prop()
  public salaryMin?: number

  @prop()
  public salaryMax?: number

  @prop()
  public responsibilities?: Array<string>

  @prop()
  public requirements?: Array<string>

  @prop()
  public benefits?: Array<string>

  @prop()
  public tags?: Array<string>

  @prop({ ref: () => Company })
  public company?: Ref<Company>

  @prop()
  public expiresAt?: Date

  @prop()
  public expiresIn?: string
}
