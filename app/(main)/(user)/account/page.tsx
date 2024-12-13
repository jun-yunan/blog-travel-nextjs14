'use client';

import { checkUsername, getCurrentUser } from '@/api/user';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import useDebounce from '@/hooks/useDebounce';
import { useUserStore } from '@/hooks/useUserStore';
import { queryClient } from '@/providers/tanstack-query-provider';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { Check, Loader2 } from 'lucide-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface SettingsPageProps {}

const formUpdateUser = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .max(30, { message: 'Username cannot be longer than 30 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores (_), and hyphens (-).',
    }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

const SettingsPage: FunctionComponent<SettingsPageProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoadingCheckUsername, setIsLoadingCheckUsername] = useState(false);
  // const [username, setUsername] = useState<string | null>(null);
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const form = useForm<z.infer<typeof formUpdateUser>>({
    defaultValues: {
      username: '',
      email: '',
    },
    resolver: zodResolver(formUpdateUser),
  });

  const username = useDebounce(form.watch('username'), 500);

  const {
    mutate: mutationUpdateUser,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (
      values: z.infer<typeof formUpdateUser>,
    ): Promise<User | null> => {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser?._id}`,
        values,
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    onError(error, variables, context) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later');
      }
    },
    onSuccess(data, variables, context) {
      toast.success('Profile updated successfully');
      setError(null);
      queryClient.invalidateQueries({ queryKey: ['currentUser', 'user'] });
      // queryClient.setQueriesData(
      //   { queryKey: ['currentUser', data?._id] },
      //   data,
      // );
    },
  });

  const { mutate: mutationCheckUsername, isPending: isPendingCheckUsername } =
    useMutation({
      mutationKey: ['check-username'],
      mutationFn: checkUsername,
      onSuccess(data, variables, context) {
        setError(null);
      },
      onError(error, variables, context) {
        console.error(error);
        if (isAxiosError(error)) {
          setError(error.response?.data.message || error.response?.data);
        } else {
          setError('An error occurred. Please try again later');
        }
      },
    });

  const onSubmit = async (values: z.infer<typeof formUpdateUser>) => {
    mutationUpdateUser({
      email: values.email,
      username: `@${values.username}`,
    });
  };

  useEffect(() => {
    if (currentUser) {
      form.setValue('email', currentUser.email);
      form.setValue('username', currentUser.username.substring(1));
    }
  }, [form, currentUser]);

  useEffect(() => {
    if (username && currentUser?._id) {
      mutationCheckUsername({
        username: `@${username}`,
        userId: currentUser?._id,
      });
    }
  }, [currentUser, username]);

  return (
    <div className="w-full flex flex-col items-start px-6">
      <Form {...form}>
        <form
          className="w-full space-y-8 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            disabled={isPending}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[44px] text-lg"
                    type="text"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <div className="flex items-center justify-between">
                    <p>
                      Your Dribbble URL: https://dribbble.com/@{field.value}
                    </p>
                    {isPendingCheckUsername ? (
                      <Loader2 className="animate-spin" />
                    ) : !!error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <Check className="text-green-600 h-5 w-5" />
                    )}
                  </div>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[44px] text-lg"
                    type="email"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full gap-x-4">
            <Button
              type="button"
              disabled={isPending}
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                form.setValue('email', currentUser?.email || '');
                form.setValue(
                  'username',
                  currentUser?.username.substring(1) || '',
                );
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-full">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Saves Change'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
