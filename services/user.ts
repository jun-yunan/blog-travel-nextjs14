import { formEditProfile, formPassword } from '@/schema/form';
import { User } from '@/types/user';
import axios from 'axios';
import { z } from 'zod';

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/user-by-username/${username}`,
      { withCredentials: true },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProfileUserById = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof formEditProfile>;
}): Promise<User | null> => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    data,
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }
  return null;
};

export const updateUserAvatar = async ({
  image,
}: {
  image: File;
}): Promise<User | null> => {
  const formData = new FormData();
  formData.set('image', image);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/update-avatar`,
    formData,
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }
  return null;
};

export const updateUserPassword = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof formPassword>;
}) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/update-password`,
    data,
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }
  return null;
};

export const checkUsername = async ({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/check-username?username=${username}&userId=${userId}`,
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }
  return null;
};

export const updateUsernameAndEmail = async ({
  email,
  username,
  userId,
}: {
  username: string;
  email: string;
  userId: string;
}) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      email,
      username,
    },
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  return null;
};

export const favoriteBlog = async ({ blogId }: { blogId: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/favorite-blog`,
    {
      blogId,
    },
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  return null;
};

export const unfavoriteBlog = async ({ blogId }: { blogId: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/unfavorite-blog`,
    {
      blogId,
    },
    {
      withCredentials: true,
    },
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  return null;
};
