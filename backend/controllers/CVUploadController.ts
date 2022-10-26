import { Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { CustomRequest } from '../middleware/authHandler'
import { UserModel } from '../models'

export const saveCv = expressAsyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await UserModel.findById(req.user?._id)
    if (user) {
      const cvPath = req.file?.path
      const cvData = JSON.parse(req.body.cvData)
      user.cvPath = cvPath
      user.cvData = cvData
      const updatedUser = await user.save()
      res.send(updatedUser.cvPath)
    }
  }
)
