import { formCreateBlog } from '@/app/(main)/write-blog/page';
import { Blog } from '@/types/blog';
import axios from 'axios';
import { z } from 'zod';

export const createBlog = async ({
  data,
  published,
}: {
  data: z.infer<typeof formCreateBlog>;
  published: boolean;
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
    { ...data, published },
    {
      withCredentials: true,
    },
  );

  if (response.status === 201 && response.data) {
    return response.data;
  }

  return null;
};

export const getAllBlog = async (): Promise<Blog[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
