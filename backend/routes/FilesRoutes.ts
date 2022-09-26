import express from 'express'
import multer from 'multer'
import path from 'path'
import { protect } from '../middleware/authHandler'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage,
})

router.post('/cv', protect, upload.single('file'), (req, res) => {
  res.send(`/${req.file?.path}`)
})

router.post('/logo', protect, upload.single('file'), (req, res) => {
  res.send(`/${req.file?.path}`)
})

export default router
