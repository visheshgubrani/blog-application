import cookieParser from 'cookie-parser'
import express from 'express'
import { blogRouter, commentRouter, likeRouter, userRouter } from './routes'

const app = express()
app.use(cors())
app.use(express.json({ limit: '32kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/users', blogRouter)
app.use('/api/v1/users', commentRouter)
app.use('/api/v1/users', likeRouter)

export default app
