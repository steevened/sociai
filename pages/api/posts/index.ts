import { db } from '@/lib/db';
import { Post, User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handlePublicationPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await db.connect();
    const user = await User.findOne({ email: session.user?.email });
    await db.disconnect();

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const userId = user._id;

    const { image, caption = '' } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'image is required' });
    }

    const newPost = new Post({
      userId,
      image,
      caption,
      likes: [],
      comments: [],
    });

    await db.connect();
    await newPost.save();
    await db.disconnect();

    res.status(201).json({ newPost });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(500).json(error);
  }
};
