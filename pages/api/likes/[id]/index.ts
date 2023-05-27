import { db } from '@/lib/db';
import { Likes } from '@/models';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

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
      return getLikesByPostId(req, res);
    case 'POST':
      return toggleLike(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

const getLikesByPostId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db.connect();
    const likes = await Likes.find({ post: id }).populate('user');
    await db.disconnect();
    return res.status(200).json({ likes });
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ error: error.message });
  }
};

const toggleLike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await db.connect();
    const isLiked = await Likes.findOne({ post: id, user: req.body.userId });
    if (isLiked) {
      await Likes.findByIdAndDelete(isLiked._id);
      return res.status(200).json({ message: 'unliked' });
    } else {
      const like = new Likes({ post: id, user: req.body.userId });
      await like.save();
      return res.status(201).json({ message: 'liked' });
    }
    await db.disconnect();
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ error: error.message });
  }
};
