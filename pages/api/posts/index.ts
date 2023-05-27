import { db } from '@/lib/db';
import { Post, User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getCsrfToken, getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]';
import { uploadImageToCloudinary } from '@/lib/utils/cloudinary';

export default async function handlePublicationPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession(req, res, authOptions);
  // const csrf = await getCsrfToken({ req });

  switch (req.method) {
    case 'GET':
      await db.connect();
      const posts = await Post.find({})
        .populate('user')
        .populate('likes')
        .sort({ createdAt: -1 });
      await db.disconnect();
      return res.status(200).json({ posts });
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const csrf = await getCsrfToken({ req });
  // console.log(session);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await db.connect();
    const user = await User.findOne({ email: session?.user?.email });
    await db.disconnect();

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const { image, caption = '' } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'image is required' });
    }

    const imageUrl = await uploadImageToCloudinary(image);

    res.status(201).json({ imageUrl });

    const newPost = new Post({
      // userId,
      user,
      image: imageUrl,
      caption,
      likes: [],
      comments: [],
    });

    await db.connect();
    await newPost.save();
    await db.disconnect();

    // res.status(201).json({ newPost });
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    res.status(500).json(error.response.data);
  }
};
