import { db } from '@/lib/db';
import { User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    await db.disconnect();
  }
}
