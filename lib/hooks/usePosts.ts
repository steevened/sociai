import useSWR from 'swr';
import { IPost, PostsResponse } from '../interfaces';

const usePosts = () => {
  const { data, error, isLoading, mutate } =
    useSWR<PostsResponse>('/api/posts');

  return {
    posts: data?.posts,
    isLoading,
    error,
    mutate,
  };
};

export { usePosts };
