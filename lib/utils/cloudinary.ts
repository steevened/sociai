// const cloudinary = require('./../../cloudinary').v2;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadImageToCloudinary = async (base64ImageData: string) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(base64ImageData, {
      folder: 'sociai', // Optional: Specify the folder to store the image in Cloudinary
    });

    // Return the Cloudinary image URL
    return uploadResult.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export { uploadImageToCloudinary, cloudinary };
