import User from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'

const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new ApiError(403, 'Unauthorized Access')
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken',
    )

    if (!user) {
      throw new ApiError(500, 'Internal Server Error')
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
})

export default verifyJwt
