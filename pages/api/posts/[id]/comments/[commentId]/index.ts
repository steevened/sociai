import { db } from '@/lib/db';
import { Comments, Post } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { commentId } = req.query;

  if (!mongoose.isValidObjectId(commentId)) {
    return res.status(400).json({ message: `Invalid ID ` + commentId });
  }

  switch (req.method) {
    case 'PATCH':
      return updateComment(req, res);
    case 'DELETE':
      return deleteComment(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const deleteComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId } = req.query;
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  try {
    await db.connect();
    const postToUpdate = await Post.findById(id);
    if (!postToUpdate) {
      await db.disconnect();
      return res.status(404).json({ message: 'Post not found' });
    }
    const commentToDelete = await Comments.findById(commentId);
    if (!commentToDelete) {
      await db.disconnect();
      return res.status(404).json({ message: 'comment not found' });
    }
    // const { _id, post, user, comment } = commentToDelete;

    // const commentOnPost = { _id, post, user, comment };

    await postToUpdate.updateOne({
      $pull: { comments: commentId },
    });

    await Comments.findByIdAndRemove(commentId);

    await db.disconnect();
    return res.status(200).json({ message: 'Deleted succesfully' });
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: error });
  }
};

const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { commentId } = req.query;
  const { id } = req.query;
  const { comment } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: 'unauthorized' });
  if (!comment) return res.status(402).json({ message: 'comment required' });

  try {
    await db.connect();
    const postToUpdate = await Post.findById(id);
    if (!postToUpdate) {
      await db.disconnect();
      return res.status(404).json({ message: 'post not found' });
    }
    const commentToUpdate = await Comments.findById(commentId);
    if (!commentToUpdate) {
      await db.disconnect();
      return res.status(404).json({ message: 'comment not found' });
    }

    await Comments.findByIdAndUpdate(commentId, { comment });

    await postToUpdate.updateOne({
      $pull: { comments: { _id: commentId } },
    });

    // Add the updated comment to the comments array
    await postToUpdate.updateOne({
      $push: { comments: commentToUpdate },
    });

    await db.disconnect();
    return res.status(200).json({ message: 'comment updated' });
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: error });
  }
};
