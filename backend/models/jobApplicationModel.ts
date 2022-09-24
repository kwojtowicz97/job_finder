import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { OfferClass } from './offerModel'
import { UserClass } from './userModel'

export interface SendJobApplicationData {
  _id: string
  offer: string
  user: string
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  experience: string
  cvFile: string
}

export class JobApplicationClass {
  @prop({ ref: () => OfferClass })
  public offer?: Ref<OfferClass>

  @prop({ ref: () => UserClass })
  public user?: Ref<UserClass>

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

  @prop()
  public experience?: string

  @prop()
  public cvFile?: string

  @prop()
  public createdAt?: Date
}

const JobApplicationModel = getModelForClass(JobApplicationClass)

export default JobApplicationModel
