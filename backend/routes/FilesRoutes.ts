import express from 'express'
import multer from 'multer'
import path from 'path'

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

/**
 * Check if a file type matches one of the expected extensions (images only)
 * @param file
 * @param cb
 */
function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(Error('Images only!'))
  }
}

const upload = multer({
  storage,
})

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send(`/${req.file?.path}`)
})

export default router