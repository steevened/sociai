import { db } from '@/lib/db';
import { User } from '@/models';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ObjectId ' + id });
  }

  switch (req.method) {
    case 'GET':
      return getUserById(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    //connect to db
    await db.connect();
    const user = await User.findById(id);

    if (!user) {
      await db.disconnect();
      return res.status(404).json({ message: 'User not found' });
      //disconnect from db
    }

    await db.disconnect();
    return res.status(200).json({ user });
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error });
  }
};
