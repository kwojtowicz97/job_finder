import { getModelForClass } from '@typegoose/typegoose'

import { Company } from './companyModel'
import { JobApplication } from './jobApplicationModel'
import { OfferClass } from './offerModel'
import { Review } from './reviewModel'
import { User } from './userModel'

export const CompanyModel = getModelForClass(Company)
export const JobApplicationModel = getModelForClass(JobApplication)
export const OfferModel = getModelForClass(OfferClass)
export const ReviewModel = getModelForClass(Review)
export const UserModel = getModelForClass(User)
