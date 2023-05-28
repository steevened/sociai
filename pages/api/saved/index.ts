import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { db } from '@/lib/db';
import { Saved } from '@/models';

export default async function handlerSaved(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await db.connect();
    const saved = await Saved.find({}).populate('post').sort({ createdAt: -1 });
    await db.disconnect();
    if (!saved) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ saved });

    // await db.disconnect();
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ error });
  }

  return res.status(200).json({ message: 'ok' });
}
