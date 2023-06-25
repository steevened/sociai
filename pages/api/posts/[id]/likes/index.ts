import { db } from '@/lib/db';
import { Likes, Post, User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'invalid ID ' + id });
  }

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

    if (!user) {
      await db.disconnect();
      return res.status(404).json({ error: 'user not found' });
    }

    const post = await Post.findById(id);

    if (!post) {
      await db.disconnect();
      return res.status(404).json({ error: 'post not found' });
    }

    const like = await Likes.findOne({ post, user });
    if (like) {
      await Likes.findByIdAndDelete(like._id);
      await post.updateOne({ $pull: { likes: like._id } });
      await db.disconnect();
      return res.status(200).json({ liked: true });
    } else {
      const newLike = new Likes({ post, user });
      await post.updateOne({ $push: { likes: newLike } });
      await newLike.save();
      await db.disconnect();
      return res.status(200).json({ liked: false });
    }
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ error: error.message });
  }
};
