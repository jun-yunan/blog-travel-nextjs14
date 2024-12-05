import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        } else {
          setUser(null);
          router.push('/login');
        }
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return { user, isLoading, error };
};
