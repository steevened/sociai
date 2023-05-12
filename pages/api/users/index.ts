import { User } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
}
