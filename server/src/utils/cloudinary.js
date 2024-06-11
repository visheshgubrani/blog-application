import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath)
    }
    // unlink and access are not working
    return response
  } catch (error) {
    console.log('Cloudinary Error:', error)
    fs.unlinkSync(localFilePath)
    return null
  }
}
export default uploadOnCloudinary
