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

interface UpdateComment {
  comment: string;
}

export const updateComment = async (
  postId: string,
  commentId: string,
  comment: string
) => {
  const { data } = await axios.patch(
    `api/posts/${postId}/comments/${commentId}`,
    { comment },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const deleteComment = async (postID: string, commentId: string) => {
  const { data } = await axios.delete(
    `api/posts/${postID}/comments/${commentId}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
