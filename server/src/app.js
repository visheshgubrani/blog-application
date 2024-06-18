import cookieParser from 'cookie-parser'
import express from 'express'
import userRouter from './routes/user.routes.js'
import likeRouter from './routes/like.routes.js'
import commentRouter from './routes/comment.routes.js'
import blogRouter from './routes/blog.routes.js'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
)
app.use(express.json({ limit: '32kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// Routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/likes', likeRouter)

export default app
