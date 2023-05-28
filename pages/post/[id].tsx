import Layout from '@/components/Layout';
import { NextPageWithLayout } from '../_app';
import TopBar from '@/components/atoms/TopBar';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { db } from '@/lib/db';
import { Post } from '@/models';
import { Post as PostInterface } from '@/lib/interfaces';

interface Props {
  post: PostInterface;
}

const PostPage: NextPageWithLayout<Props> = ({ post }) => {
  console.log(post);
  return (
    <div>
      <TopBar title={'Post'} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id } = query;
  const session = await getServerSession(req, res, authOptions);
  // console.log(session);
  // if(!session) return
  await db.connect();
  const post = await Post.findOne({ _id: id }).populate('user');
  console.log(post);
  await db.disconnect();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

PostPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default PostPage;
