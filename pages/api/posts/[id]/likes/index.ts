import { db } from '@/lib/db';
import { Likes, Post, User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);
  if (req.method === 'POST') {
    toggleLikes(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

const toggleLikes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

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

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'post not found' });
    }

    const like = await Likes.findOne({ post, user });
    if (like) {
      await db.connect();
      await Likes.findByIdAndDelete(like._id);
      await db.disconnect();
      return res.status(200).json({ like: null });
    } else {
      await db.connect();
      const newLike = new Likes({ post, user });
      await newLike.save();
      await db.disconnect();
      return res.status(200).json({ like: newLike });
    }
    return res.status(200).json({ like });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
