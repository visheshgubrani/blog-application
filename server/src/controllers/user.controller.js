import User from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'
import generateTokens from '../utils/generateTokens.js'

const options = {
  httpOnly: true,
  secure: false,
}

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
  if (req.file) {
    const avatarUpload = await uploadOnCloudinary(req.file.path)
    if (!avatarUpload) {
      throw new ApiError(400, 'failed to upload on cloudinary')
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

  const isPasswordCorrect = await existingUser.isPasswordCorrect(password)
  if (!isPasswordCorrect) {
    throw new ApiError(400, 'Password Incorrect')
  }

  const { accessToken, refreshToken } = await generateTokens(existingUser?._id)

  const loggedInUser = await User.findById(existingUser?._id).select(
    '-password -refreshToken',
  )

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, 'User loggedIn Successfully', {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }),
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true },
  )

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, 'User Logged Out Successfully', {}))
})

export { registerUser, loginUser, logoutUser }
