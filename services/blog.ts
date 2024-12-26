import { formCreateBlog, formEditBlog } from '@/schema/form';
import { Blog } from '@/types/blog';
import axios from 'axios';
import { z } from 'zod';

export const createBlog = async ({
  data,
  published,
  coverImage,
}: {
  data: z.infer<typeof formCreateBlog>;
  published: boolean;
  coverImage: File | null;
}) => {
  const formData = new FormData();
  formData.set('title', data.title);
  formData.set('content', data.content);
  formData.set('published', String(published));
  if (data.tags) {
    formData.set('tags', JSON.stringify(data.tags));
  }
  if (coverImage) {
    formData.set('coverImage', coverImage);
  }
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
    formData,
    {
      withCredentials: true,
    },
  );

  if (response.status === 201 && response.data) {
    return response.data;
  }

  return null;
};

export const editBlog = async ({
  data,
  published,
  coverImage,
  blogId,
}: {
  data: z.infer<typeof formEditBlog>;
  published: boolean;
  coverImage: File | null;
  blogId: string;
}) => {
  const formData = new FormData();
  formData.set('title', data.title);
  formData.set('content', data.content);
  formData.set('published', String(published));
  if (data.tags) {
    formData.set('tags', JSON.stringify(data.tags));
  }
  if (coverImage) {
    formData.set('coverImage', coverImage);
  }
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
    formData,
    {
      withCredentials: true,
    },
  );

  if (response.status === 201 && response.data) {
    return response.data;
  }

  return null;
};

export const getAllBlogByUser = async (): Promise<Blog[] | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me/blogs`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllBlogByUsername = async ({
  username,
}: {
  username: string;
}): Promise<Blog[] | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/blogs-by-username/${username}`,
      {
        withCredentials: true,
      },
    );

    if (response.data && response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteBlogById = async ({ blogId }: { blogId: string }) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  return null;
};

export const getAllBlog = async (): Promise<Blog[] | null> => {
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

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBlogById = async ({
  blogId,
}: {
  blogId: string;
}): Promise<Blog | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllBlogByAuthor = async ({
  authorId,
}: {
  authorId: string;
}): Promise<Blog[] | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/blogs/${authorId}`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBlogByTag = async ({
  tags,
}: {
  tags: string[];
}): Promise<Pick<Blog, 'id' | 'title'>[] | null> => {
  try {
    if (!tags || tags.length === 0) {
      console.error('No tags provided');
      return null;
    }

    const queryParams = tags
      .map((tag) => `tags=${encodeURIComponent(tag)}`)
      .join('&');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/tags?${queryParams}`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const likeBlog = async ({ blogId }: { blogId: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/like/${blogId}`,
    {},
    {
      withCredentials: true,
    },
  );
  if (response.data && response.status === 200) {
    return response.data;
  }

  return null;
};

export const unlikeBlog = async ({ blogId }: { blogId: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/unlike/${blogId}`,
    {},
    {
      withCredentials: true,
    },
  );
  if (response.data && response.status === 200) {
    return response.data;
  }

  return null;
};
