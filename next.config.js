/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
