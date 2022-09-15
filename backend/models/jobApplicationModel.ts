import mongoose, {
  Schema,
  model,
  InferSchemaType,
  Model,
  ObjectId,
} from 'mongoose'

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

export interface IJobApplication {
  offer: ObjectId
  user: ObjectId
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  experience: string
  cvFile: string
  createdAt: Date
}

export interface IJobApplicationMethods {
  toJSON(this: typeof jobApplicationSchema): SendJobApplicationData
}

type UserModel = Model<IJobApplication, {}, IJobApplicationMethods>

const jobApplicationSchema = new Schema<
  IJobApplication,
  UserModel,
  IJobApplicationMethods
>(
  {
    offer: { type: mongoose.Types.ObjectId, required: true },
    user: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    experience: { type: String, required: true },
    cvFile: { type: String, required: true },
    createdAt: Date,
  },
  { timestamps: true }
)

// userSchema.method('toJSON', function toJSON(this: any) {
//   const obj = this.toObject()
//   return {
//     _id: obj._id,
//     name: obj.name,
//     email: obj.email,
//     phoneNumber: obj.phoneNumber,
//     country: obj.country,
//     city: obj.city,
//     address: obj.address,
//     isAdmin: obj.isAdmin,
//     saved: obj.saved,
//     token: generateToken(obj._id),
//   }
// })

export type JobApplicationDocument = InferSchemaType<
  typeof jobApplicationSchema
>

export const JobApplication = model<IJobApplication, UserModel>(
  'JobApplication',
  jobApplicationSchema
)
