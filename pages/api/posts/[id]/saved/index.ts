import { authOptions } from '@/pages/api/auth/[...nextauth]';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

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
  return res.status(200).json('ok');
}
