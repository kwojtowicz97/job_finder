import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { User } from './userModel'

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Company {
  // @prop({ ref: () => User })
  // public user?: Ref<User>

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
  public reviews?: Array<string>

  @prop()
  public rating?: string
}

export const CompanyModel = getModelForClass(Company)
