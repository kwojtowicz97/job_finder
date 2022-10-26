import express from 'express'
import { protect } from '../middleware/authHandler'
import { saveCv } from '../controllers/CVUploadController'
import { upload } from '../middleware/uploadFileHandler'

const router = express.Router()

router.post('/cv', protect, upload, (req, res) => {
  res.send(`/${req.file?.path}`)
})

router.post('/logo', protect, upload, (req, res) => {
  res.send(`/${req.file?.path}`)
})

router.post('/pdfCV', protect, upload, saveCv)

export default router
