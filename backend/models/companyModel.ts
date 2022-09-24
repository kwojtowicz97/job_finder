import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose'

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

  @prop()
  public reviews?: Array<string>

  @prop()
  public rating?: string
}

export const CompanyModel = getModelForClass(Company)
