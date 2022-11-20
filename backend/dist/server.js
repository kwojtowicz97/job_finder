'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const dotenv_1 = __importDefault(require('dotenv'))
const db_1 = require('./config/db')
const OfferRoutes_1 = __importDefault(require('./routes/OfferRoutes'))
const UserRoutes_1 = __importDefault(require('./routes/UserRoutes'))
const CompanyRoutes_1 = __importDefault(require('./routes/CompanyRoutes'))
const JobApplicationRoutes_1 = __importDefault(
  require('./routes/JobApplicationRoutes')
)
const FilesRoutes_1 = __importDefault(require('./routes/FilesRoutes'))
const ReviewRoutes_1 = __importDefault(require('./routes/ReviewRoutes'))
const DatabaseRoutes_1 = __importDefault(require('./routes/DatabaseRoutes'))
const path_1 = __importDefault(require('path'))
const errorHandler_1 = require('./middleware/errorHandler')
dotenv_1.default.config()
;(0, db_1.connectDB)()
const app = (0, express_1.default)()
app.use(express_1.default.json())
app.use('/api/offers', OfferRoutes_1.default)
app.use('/api/users', UserRoutes_1.default)
app.use('/api/companies', CompanyRoutes_1.default)
app.use('/api/applications', JobApplicationRoutes_1.default)
app.use('/api/uploads', FilesRoutes_1.default)
app.use('/api/reviews', ReviewRoutes_1.default)
app.use('/api/resetdata', DatabaseRoutes_1.default)
const dirname = path_1.default.resolve()
app.use(
  '/uploads',
  express_1.default.static(path_1.default.join(dirname, '/uploads'))
)
app.use(
  express_1.default.static(path_1.default.resolve(dirname, 'frontend', 'build'))
)
console.log(__dirname)
app.get('*', (req, res) => {
  res.sendFile(
    path_1.default.resolve(dirname, 'frontend', 'build', 'index.html')
  )
})
app.use(errorHandler_1.notFound)
app.use(errorHandler_1.errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT)

console.log(path_1.default.resolve(dirname, 'frontend', 'build'))
console.log(path_1.default.resolve(dirname, 'frontend', 'build', 'index.html'))
