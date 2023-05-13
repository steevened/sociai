import { db } from '@/lib/db';
import { User } from '@/models';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (mongoose.isValidObjectId(email)) {
    return res.status(400).json({ message: 'Invalid Email' });
  }

  switch (req.method) {
    case 'GET':
      return getUserByEmail(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}

const getUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  try {
    await db.connect();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      await db.disconnect();
    }
    await db.disconnect();
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(400).json({ message: error });
    await db.disconnect();
  }
};
