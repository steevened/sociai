import axios from 'axios';

export const toggleLike = async (postId: string) => {
  const { data } = await axios.post(`/api/posts/${postId}/likes`, null, {
    withCredentials: true,
  });

  return data;
};
