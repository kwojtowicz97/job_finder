import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { Company } from './companyModel'
import { JobApplication } from './jobApplicationModel'

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { toJSON: { virtuals: true } },
})
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
  public expiresIn?: number

  @prop({
    ref: 'JobApplication',
    foreignField: 'offer',
    localField: '_id',
  })
  public jobApplications?: Ref<JobApplication>[]
}
