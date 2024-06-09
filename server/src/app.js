import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()
app.use(cors())
app.use(express.json({ limit: '32kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

export default app
