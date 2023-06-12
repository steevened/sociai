import axios from 'axios';

interface Post {
  image: string;
  caption: string;
}

export const getPost = async () => {
  const { data } = await axios.get('/api/posts');
  return data;
};

export const createPost = async (post: Post) => {
  const res = await axios.post('/api/posts', post, {
    withCredentials: true,
  });
  return res;
};

export const updatePost = async (id: string, caption: string) => {
  const res = await axios.patch(
    `/api/posts/${id}`,
    { caption },
    {
      withCredentials: true,
    }
  );
  return res;
};
