import bcrypt from 'bcryptjs'
import {
  DocumentType,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { Company } from './companyModel'
import generateToken from '../utils/generateToken'

@pre<User>('save', async function (this, next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password!, 10)
})
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
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
  public cvPath?: string

  @prop()
  public cvData?: any

  @prop({ type: () => Array<string>, required: false, default: [] })
  public saved?: Array<string>

  @prop()
  public password?: string

  @prop({ ref: () => Company })
  public company?: Ref<Company>

  public async matchPassword(
    this: DocumentType<User>,
    enteredPassword: string
  ) {
    console.log(enteredPassword, this.password)
    return await bcrypt.compare(enteredPassword, this.password!)
  }

  public toJSON(this: DocumentType<User>) {
    const obj = this.toObject()
    return {
      _id: obj._id,
      name: obj.name,
      email: obj.email,
      phoneNumber: obj.phoneNumber,
      country: obj.country,
      city: obj.city,
      address: obj.address,
      isAdmin: obj.isAdmin,
      cvPath: obj.cvPath,
      cvData: obj.cvData,
      saved: obj.saved,
      token: generateToken(String(obj._id)),
      company: obj.company,
    }
  }
}
