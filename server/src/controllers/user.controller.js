import User from '../models/user.model.js'
import ApiError from '../utils/ApiError'
import asyncHandler from '../utils/asyncHandler.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password, bio } = req.body
  if (!(username && email && fullName && password)) {
    throw new ApiError(400, 'Please Enter all fields')
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existingUser) {
    throw new ApiError(400, 'User already exists')
  }

  let avatar
  if (req.files.avatar) {
    const avatarUpload = await uploadOnCloudinary(req.files?.avatar[0].path)
    if (!avatarUpload) {
      throw new ApiError(500, 'Error Uploading to Cloudinary')
    }
    avatar = avatarUpload.url
  }

  const user = await User.create({
    fullName,
    username,
    password,
    email,
    avatar,
    bio,
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  )

  return res
    .status(200)
    .json(new ApiResponse(201, 'User Created Successfully', createdUser))
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!(username || email) && !password) {
    throw new ApiError(400, 'Please Provide Email or Username')
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (!existingUser) {
    throw new ApiError(400, 'User not found')
  }
})

export { registerUser }
