import {
  isDocument,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { OfferClass } from './offerModel'
import { Review } from './reviewModel'

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { toJSON: { virtuals: true } },
})
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

  @prop({
    ref: () => Review,
    foreignField: 'company',
    localField: '_id',
  })
  public reviews?: Ref<Review>[]

  public get rating() {
    const sum =
      this.reviews?.reduce((prev, curr) => {
        if (isDocument(curr)) {
          return prev + curr.rating
        }
        return 0
      }, 0) || 0
    return sum / this.reviews!.length
  }

  @prop({
    ref: 'OfferClass',
    foreignField: 'company',
    localField: '_id',
    count: true,
  })
  public offersCount?: number
}
