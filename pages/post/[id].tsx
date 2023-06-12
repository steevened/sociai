import Layout from '@/components/Layout';
import { NextPageWithLayout } from '../_app';
import TopBar from '@/components/atoms/TopBar';
import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';
import { User } from '@/models';
import { Like, Post as PostInterface } from '@/lib/interfaces';

import { useEffect, useState } from 'react';
import {
  createComment,
  deleteComment,
  toggleLike,
  toggleSaved,
} from '@/lib/services';
import { usePostById, useSaved } from '@/lib/hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { toast } from 'sonner';
import { useUiStore } from '@/store/uiStore/uiStore';
import Button from '@/components/atoms/Button';
import PostContainer from '@/components/post/PostContainer';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface Props {
  userId: string;
}

const PostPage: NextPageWithLayout<Props> = ({ userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [willEdit, setWillEdit] = useState<boolean>(false);

  const [commentToDeleteId, setCommentToDeleteId] = useState<string>('');

  const { data: session } = useSession();
  const { data: saved, mutate: mutateSaved } = useSaved();

  const router = useRouter();
  const { id } = router.query;

  const { isModalOpen } = useUiStore();

  // console.log(router.query);

  const {
    data: post,
    isLoading,
    error,
    mutate: mutatePost,
  } = usePostById(id as string);

  const handleLike = async () => {
    if (!session) {
      toast.error('Please Sign Up to continue');
    }
    try {
      const res = await toggleLike(post?._id || '');
      setIsLiked(res.liked);

      // mutate();
      mutatePost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaved = async () => {
    if (!session) {
      toast.error('Please Sign Up to continue');
    }
    try {
      const res = await toggleSaved(post?._id || '');
      setIsSaved(res.saved);
      mutateSaved();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (!inputValue) return;
    if (!session) {
      return toast.error('Please Sign Up to continue');
    }
    try {
      createComment(post?._id!, inputValue)
        .then(() => {
          mutatePost();
          setInputValue('');
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteComment = async () => {
    if (!session) return toast.error('Please Sign Up to continue');
    if (!commentToDeleteId) return toast.error('Something went wrong');

    // console.log(commentToDeleteId);

    deleteComment(post?._id!, commentToDeleteId)
      .then(() => {
        mutatePost();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const isLiked = post?.likes.some((like: Like) => like.user._id === userId);
    setIsLiked(isLiked as boolean);
  }, [post, userId]);

  useEffect(() => {
    const isSaved = saved?.some((s) => s.post._id === post?._id);
    setIsSaved(isSaved as boolean);
  }, [post, saved]);

  if (isLoading || !post) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col mb-28 md:mb-0 md:min-h-screen ">
        <TopBar title={'Post'} />
        <div className="">
          <PostContainer
            post={post}
            handleLike={handleLike}
            handleSaved={handleSaved}
            isLiked={isLiked}
            isSaved={isSaved}
            handleComment={handleComment}
            inputValue={inputValue}
            setInputValue={setInputValue}
            willEdit={willEdit}
            setWillEdit={setWillEdit}
            setCommentToDeleteId={setCommentToDeleteId}
          />
        </div>
      </div>
      {isModalOpen && (
        <ConfirmModal
          onConfirm={onDeleteComment}
          onCancel={() => setCommentToDeleteId('')}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  await db.connect();
  const userLogged = await User.findOne({ email: session?.user?.email });
  await db.disconnect();

  return {
    props: {
      userId: userLogged ? JSON.parse(JSON.stringify(userLogged?._id)) : '',
    },
  };
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;
