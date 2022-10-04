import express, { application } from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import OfferRoutes from './routes/OfferRoutes'
import UserRoutes from './routes/UserRoutes'
import CompanyRoutes from './routes/CompanyRoutes'
import JobApplicationRoutes from './routes/JobApplicationRoutes'
import FilesRoutes from './routes/FilesRoutes'
import ReviewsRoutes from './routes/ReviewRoutes'
import path from 'path'
import { errorHandler, notFound } from './middleware/errorHandler'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/offers', OfferRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/companies', CompanyRoutes)
app.use('/api/applications', JobApplicationRoutes)
app.use('/api/uploads', FilesRoutes)
app.use('/api/reviews', ReviewsRoutes)

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT)
