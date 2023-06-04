import { db } from '@/lib/db';
import { Comments, Post, User } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handleComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId) {
    return res.status(400).json({ message: `Invalid ID` + id });
  }

  switch (req.method) {
    case 'GET':
      await db.connect();
      const comments = await Comments.find({ post: id }).populate('user');
      if (!comments) {
        await db.disconnect();
        return res.status(404).json({ message: 'Not found' });
      }
      return res.status(200).json({ comments });
    case 'POST':
      return createComment(req, res);

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);
  const { comment } = req.body;

  if (!session) return res.status(401).json({ message: 'Unauthorized' });
  if (!comment) return res.status(400).json({ message: 'Comment is required' });

  try {
    await db.connect();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      await db.disconnect();
      return res.status(404).json({ error: 'user not found' });
    }

    const post = await Post.findById(id);
    if (!post) {
      await db.disconnect();
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comments({ user, post, comment });
    await post.updateOne({ $push: { comments: newComment } });
    await newComment.save();
    await db.disconnect();
    return res.status(201).json({ message: 'comment created' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
