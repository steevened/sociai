import useSWR from 'swr';
import { IPost, Post, PostByID, PostsResponse } from '../interfaces';

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

const usePostById = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<PostByID>(
    postId ? `/api/posts/${postId}` : null
  );

  return {
    data: data?.post,
    isLoading,
    error,
    mutate,
  };
};

export { usePosts, usePostById };
