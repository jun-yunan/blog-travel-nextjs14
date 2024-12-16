import axios from 'axios';

export const createLikeBlog = async ({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/likes/${blogId}`,
    {
      userId,
    },
    {
      withCredentials: true,
    },
  );
  if (response.data && response.status === 200) {
    return response.data;
  }

  return null;
};
