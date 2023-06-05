import Layout from '@/components/Layout';
import { NextPageWithLayout } from '../_app';
import TopBar from '@/components/atoms/TopBar';
import { GetServerSideProps } from 'next';
import { db } from '@/lib/db';
import { Post, User } from '@/models';
import { ILikes, Like, Post as PostInterface } from '@/lib/interfaces';

import { useEffect, useState } from 'react';
import { createComment, toggleLike, toggleSaved } from '@/lib/services';
import { usePostById, usePosts, useSaved } from '@/lib/hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { toast } from 'sonner';
import TextAreaAutosize from 'react-textarea-autosize';

import PostMobile from '@/components/post/PostMobile';
import Imagecontainer from '@/components/post/Imagecontainer';
import Avatar from '@/components/Avatar';
import Username from '@/components/links/Username';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '@/components/icons/Svg';

interface Props {
  userId: string;
}

const PostPage: NextPageWithLayout<Props> = ({ userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

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
      // const res = await createComment(post._id, inputValue);
      toast.promise(createComment(post?._id!, inputValue), {
        loading: 'Loading...',
        success: 'Comment created',
        error: (data) => `${data}`,
      });

      setInputValue('');
      mutatePost();
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex flex-col mb-24 md:mb-0 md:min-h-screen">
      <TopBar title={'Post'} />
      <div className="md:hidden">
        <PostMobile
          post={post}
          handleLike={handleLike}
          handleSaved={handleSaved}
          isLiked={isLiked}
          isSaved={isSaved}
          handleComment={handleComment}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <div className="hidden h-full md:block ">
        <div className="min-h-[calc(100vh-60px)] flex items-center justify-center md:w-5/6 lg:w-3/4 mx-auto">
          <div className="flex shadow-app-shadow">
            <div className="w-1/2 ">
              <Imagecontainer image={post.image} />
            </div>
            <div className="relative w-1/2 ">
              <div className="absolute inset-x-0 top-0 flex items-center justify-start gap-4 px-2 py-1 shadow-app-bottom">
                <Avatar userId={post.user._id} imageUrl={post.user.image} />
                <Username id={post.user._id} username={post.user.name} />
              </div>
              <div className="absolute inset-x-0 bottom-0 shadow-app-top">
                <div className="flex justify-between p-2">
                  <div className="flex items-center gap-4 ">
                    <button onClick={handleLike}>
                      <LikesIconIn liked={isLiked} />
                    </button>
                    <label htmlFor="commentDesktop" role="button">
                      <CommentIcon />
                    </label>
                  </div>
                  <button onClick={handleSaved}>
                    {isSaved ? <SaveIconOut /> : <SaveIconIn />}
                  </button>
                </div>
                <div className="flex items-center p-1 mt-2 md:mt-0 shadow-app-top">
                  <TextAreaAutosize
                    id="commentDesktop"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full h-full p-2 bg-black resize-none focus:outline-none "
                  />
                  <button
                    onClick={handleComment}
                    disabled={inputValue.length <= 0}
                    className="text-app-blue right-2 disabled:text-opacity-50"
                  >
                    POST
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center grow md:px-5 ">
        <div className=" md:flex md:max-w-4xl md:shadow-app-shadow md:mx-auto">
          <div className="flex items-center justify-between px-4 py-2 md:hidden">
            <div className="flex items-center gap-2">
              <Avatar imageUrl={post.user.image} />
              <Username username={post.user.name} id={post.user._id} />
            </div>
            <MenuDropdown postId={post._id} />
          </div>
          <div className="w-full md:flex-1  p-[1px] shadow-app-right">
            <Imagecontainer image={post.image} caption={post.caption} />
          </div>
          <div className="flex flex-col px-4 mt-4 md:flex-1 md:mt-0 md:px-0 ">
            <div className="items-center justify-between hidden px-4 py-2 mb-4 h-min md:flex shadow-app-bottom ">
              <div className="flex items-center gap-2">
                <Avatar imageUrl={post.user.image} />
                <Username username={post.user.name} id={post.user._id} />
              </div>
              <MenuDropdown postId={post._id} />
            </div>
            <div className="hidden h-full max-h-full px-4 overflow-y-auto md:block ">
              <div className="space-y-5">
                <div className="text-sm">
                  <Username
                    username={post.user.name}
                    id={post.user._id}
                    className="mr-1"
                  />
                  <span className="">{post.caption}</span>
                </div>
                {post.comments.length > 0 && (
                  <ul className="space-y-5">
                    {post.comments.map((comment) => (
                      <li key={comment._id} className="flex items-start gap-2">
                        <Avatar
                          imageUrl={comment.user.image}
                          className="w-12 min-w-[48px]"
                        />
                        <div className="">
                          <Username
                            id={comment.user._id}
                            username={comment.user.name}
                          />{' '}
                          {
                            <p className="inline text-sm text-gray-200 text-opacity-80">
                              {comment.comment}
                            </p>
                          }
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="md:px-4 md:shadow-app-top md:py-3 h-min">
              <div className="flex">
                <div className="flex items-center gap-4 grow">
                  <button onClick={handleLike}>
                    <LikesIconIn liked={isLiked} />
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
            <div className="flex items-center p-1 mt-2 md:mt-0 shadow-app-top max-h-min ">
              <TextAreaAutosize
                id="comment"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a comment..."
                className="w-full h-full p-2 bg-black resize-none focus:outline-none "
              />
              <button
                onClick={handleComment}
                disabled={inputValue.length <= 0}
                className="text-app-blue right-2 disabled:text-opacity-50"
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div> */}
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
