import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import OfferRoutes from './routes/OfferRoutes'
import path from 'path'

dotenv.config()
const app = express()
connectDB()

app.use('/api/offers', OfferRoutes)

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

const PORT = process.env.PORT || 5000

app.listen(PORT)
