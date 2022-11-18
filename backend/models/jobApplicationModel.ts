import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { OfferClass } from './offerModel'
import { User } from './userModel'

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

export enum Status {
  New = 'New',
  Opened = 'Opened',
  Considering = 'Considering',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export class JobApplication {
  @prop({ ref: () => OfferClass, required: true })
  public offer!: Ref<OfferClass>

  @prop({ ref: () => User })
  public user!: Ref<User>

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
  public experience?: string

  @prop()
  public cvFile?: string

  @prop()
  public createdAt?: Date

  @prop({ default: Status.New, required: true })
  public status!: Status
}
