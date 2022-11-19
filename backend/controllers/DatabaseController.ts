import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { importData } from '../seeder'

export const resetDatabase = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      await importData()
      res.send({ success: true })
    } catch {
      throw new Error('failed')
    }
  }
)
