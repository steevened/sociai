import axios from 'axios';

export const toggleSaved = async (postId: string) => {
  const { data } = await axios.post(`/api/posts/${postId}/saved`, null, {
    withCredentials: true,
  });
  return data;
};
