import axios from 'axios';

export const createComment = async (postId: string, comment: string) => {
  const { data } = await axios.post(
    `api/posts/${postId}/comments`,
    { comment },
    {
      withCredentials: true,
    }
  );
  return data;
};
