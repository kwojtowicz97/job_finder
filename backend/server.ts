import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import OfferRoutes from './routes/OfferRoutes'

dotenv.config()
const app = express()
connectDB()

app.use('/api/offers', OfferRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT)
