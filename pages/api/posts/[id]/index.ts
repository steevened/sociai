import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { Post } from '@/models';

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
      await db.connect();
      const post = await Post.findById(id).populate('user').populate('likes');
      if (!post) {
        await db.disconnect();
        return res.status(404).json({ message: 'Post not found' });
      }
      await db.disconnect();
      return res.status(200).json({ post });
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
