import { formEditProfile } from '@/app/(main)/(user)/account/edit-profile/page';
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

export const updateProfileUserById = async ({
  userId,
  data,
}: {
  userId: string;
  data: z.infer<typeof formEditProfile>;
}): Promise<User | null> => {
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
};
