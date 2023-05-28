import { authOptions } from '@/pages/api/auth/[...nextauth]';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { Post, Saved, User } from '@/models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid Object ID' + id });
  }

  console.log(id);

  switch (req.method) {
    case 'POST':
      return handleSaved(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// const getSaved = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;

//   try {
//     await db.connect();
//     const saved = await Saved.find({});
//     await db.disconnect();

//     if (!saved) return res.status(404).json({ message: 'Not found' });
//     await db.disconnect();
//     return res.status(200).json({ saved });
//   } catch (error: any) {
//     await db.disconnect();
//     return res.status(500).json({ error: error.message });
//   }
// };

const handleSaved = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log(session);

  try {
    await db.connect();
    const user = await User.findOne({ email: session?.user?.email });
    await db.disconnect();
    if (!user) return res.status(404).json({ message: 'User not found' });

    await db.connect();
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await db.connect();
    const saved = await Saved.findOne({ post, user }).populate('post');
    await db.disconnect();
    // console.log(saved);
    // return res.status(200).json({ saved });
    if (!saved) {
      await db.connect();
      const newSaved = new Saved({
        post,
        user,
      });
      await newSaved.save();
      await db.disconnect();
      return res.status(200).json({ saved: true });
    } else {
      await db.connect();
      await Saved.findByIdAndDelete(saved._id);
      await db.disconnect();
      return res.status(200).json({ saved: false });
    }
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json(error);
  }
};
