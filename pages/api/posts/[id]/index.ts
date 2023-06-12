import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { Post, User } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'invalid ID ' + id });
  }

  switch (req.method) {
    case 'GET':
      return getPostById(req, res);
    case 'PATCH':
      return updatePost(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getPostById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await db.connect();
    const post = await Post.findById(id)
      .populate('user')
      .populate({ path: 'likes', populate: { path: 'user' } })
      .populate({ path: 'comments', populate: { path: 'user' } });
    if (!post) {
      await db.disconnect();
      return res.status(404).json({ message: 'Post not found' });
    }
    await db.disconnect();
    return res.status(200).json({ post });
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: error });
  }
}

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { caption } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: 'unauthorized' });
  if (!caption) return res.status(400).json({ message: 'caption is required' });

  try {
    await db.connect();

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      await db.disconnect();
      return res.status(404).json({ error: 'user not found' });
    }

    const postToUpdate = await Post.findById(id);
    if (!postToUpdate) {
      await db.disconnect();
      return res.status(404).json({ message: 'post not found' });
    }
    if (postToUpdate.user.toString() !== user._id.toString()) {
      await db.disconnect();
      return res.status(401).json({ message: 'unauthorized' });
    }

    await postToUpdate.updateOne({ caption });

    await db.disconnect();
    return res.status(200).json({ message: 'updated successfully' });

    // return res.status(200).json({ post: postToUpdate });

    // }
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
