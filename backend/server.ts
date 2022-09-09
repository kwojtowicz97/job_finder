import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import OfferRoutes from './routes/OfferRoutes'
import UserRoutes from './routes/UserRoutes'
import CompanyRoutes from './routes/CompanyRoutes'
import path from 'path'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/offers', OfferRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/companies', CompanyRoutes)

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

const PORT = process.env.PORT || 5000

app.listen(PORT)
