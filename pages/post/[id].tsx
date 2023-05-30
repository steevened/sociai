import Layout from '@/components/Layout';
import { NextPageWithLayout } from '../_app';
import TopBar from '@/components/atoms/TopBar';
import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';
import { Post, User } from '@/models';
import { ILikes, Post as PostInterface } from '@/lib/interfaces';
import Avatar from '@/components/Avatar';
import MenuDropdown from '@/components/MenuDropdown';
import Image from 'next/image';
import Username from '@/components/links/Username';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '@/components/icons/Svg';
import { useEffect, useState } from 'react';
import { toggleLike, toggleSaved } from '@/lib/services';
import { usePostById, usePosts, useSaved } from '@/lib/hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

interface Props {
  userId: string;
}

const PostPage: NextPageWithLayout<Props> = ({ userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data: session } = useSession();
  const { data: saved, mutate: mutateSaved } = useSaved();

  const router = useRouter();
  const { id } = router.query;

  const {
    data: post,
    isLoading,
    error,
    mutate: mutatePost,
  } = usePostById(id as string);

  // console.log(post);

  const handleLike = async () => {
    try {
      const res = await toggleLike(post?._id || '');
      setIsLiked(res.liked);
      // console.log(res);
      // mutate();
      mutatePost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaved = async () => {
    try {
      const res = await toggleSaved(post?._id || '');
      setIsSaved(res.saved);
      mutateSaved();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLiked = post?.likes.some((like) => (like.user as any) === userId);
    setIsLiked(isLiked as boolean);
  }, [post, userId]);

  useEffect(() => {
    const isSaved = saved?.some((s) => s.post._id === post?._id);
    setIsSaved(isSaved as boolean);
  }, [post, saved]);

  if (isLoading || !post) return <div>Loading...</div>;

  return (
    <div className="mb-24 md:mb-0 md:min-h-screen flex flex-col">
      <TopBar title={'Post'} />
      <div className="grow flex items-center justify-center md:px-5">
        <div className="md:flex  md:max-w-4xl md:shadow-app-shadow md:mx-auto ">
          <div className="flex items-center justify-between px-4 py-2 md:hidden">
            <div className="flex items-center gap-2">
              <Avatar imageUrl={post.user.image} />
              <Username username={post.user.name} id={post.user._id} />
            </div>
            <MenuDropdown postId={post._id} />
          </div>
          <div className="w-full md:flex-1 shadow-app-shadow p-[1px]">
            <Image
              width={2000}
              height={2000}
              src={post.image}
              alt={post.caption || 'image post'}
            />
          </div>
          <div className="px-4 mt-4 md:flex-1 md:mt-0 md:px-0 flex flex-col ">
            <div className="hidden md:flex items-center justify-between px-4 py-2 mb-4 shadow-app-bottom">
              <div className="flex  items-center gap-2">
                <Avatar imageUrl={post.user.image} />
                <Username username={post.user.name} id={post.user._id} />
              </div>
              <MenuDropdown postId={post._id} />
            </div>
            <div className="grow px-4 hidden md:block">
              <div className="text-sm">
                <Username
                  username={post.user.name}
                  id={post.user._id}
                  className="mr-1"
                />
                <span className="">{post.caption}</span>
              </div>
            </div>
            <div className="md:px-4 md:shadow-app-top md:py-3">
              <div className="flex">
                <div className="flex items-center gap-4 grow">
                  <button onClick={handleLike}>
                    <LikesIconIn liked={isLiked} />
                    {/* <LikesIconIn /> */}
                  </button>
                  <label htmlFor="comment" role="button">
                    <CommentIcon />
                  </label>
                </div>
                <button onClick={handleSaved}>
                  {isSaved ? <SaveIconOut /> : <SaveIconIn />}
                </button>
              </div>
              <div className="flex flex-col gap-1 mt-4 md:mt-2">
                <div>
                  <button className="text-xs font-semibold">
                    {post.likes.length} like{post.likes.length !== 1 && 's'}
                  </button>
                </div>
                <div className="md:hidden">
                  <div className="text-sm">
                    <Username
                      username={post.user.name}
                      id={post.user._id}
                      className="mr-1"
                    />
                    <span className="">{post.caption}</span>
                  </div>
                </div>
                {post.comments.length > 0 && (
                  <div className="mt-1">
                    <button className="text-sm text-gray-200 text-opacity-50 ">
                      View all {post.comments.length} comments
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 md:mt-0 shadow-app-top p-1 flex items-center">
              <textarea
                id="comment"
                placeholder="Add a comment..."
                className="w-full h-full bg-black focus:outline-none p-2 resize-none "
              />
              <button className="text-app-blue  right-2">POST</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
