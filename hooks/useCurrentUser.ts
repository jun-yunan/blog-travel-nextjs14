import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User } from '@/types/user';

export const useCurrentUser = () => {
  const {
    data: currentUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', 'currentUser'],
    queryFn: async (): Promise<User | null> => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error('An error occurred');
        return null;
      }
    },
  });
  return { currentUser, isPending, isSuccess, isError, error };
};
