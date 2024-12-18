import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { User } from '@/types/user';
import { userStore } from '@/store/userStore';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser: setUserStore } = userStore();

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200 && response.data) {
          const data = response.data;
          console.log(data);

          setUser(data);
          setUserStore(data);
        } else {
          setUser(null);
          setUserStore(null);
          router.push('/sign-in');
        }
      } catch (error) {
        setUserStore(null);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError('Unauthorized');
            router.push('/sign-in');
          }
        }
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, setUserStore]);

  return { user, isLoading, error };
};
