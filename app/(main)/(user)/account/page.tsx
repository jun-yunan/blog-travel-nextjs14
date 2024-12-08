'use client';

import { getCurrentUser } from '@/api/user';
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
import { useUserStore } from '@/hooks/useUserStore';
import { queryClient } from '@/providers/tanstack-query-provider';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface SettingsPageProps {}

const formEditProfile = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
});

const SettingsPage: FunctionComponent<SettingsPageProps> = () => {
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const form = useForm<z.infer<typeof formEditProfile>>({
    defaultValues: {
      username: '',
      email: '',
    },
    resolver: zodResolver(formEditProfile),
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: async (
      values: z.infer<typeof formEditProfile>,
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
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An error occurred');
      }
    },
    onSuccess(data, variables, context) {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['currentUser', 'user'] });
      // queryClient.setQueriesData(
      //   { queryKey: ['currentUser', data?._id] },
      //   data,
      // );
    },
  });

  const onSubmit = async (values: z.infer<typeof formEditProfile>) => {
    mutate(values);
  };

  useEffect(() => {
    if (currentUser) {
      form.setValue('email', currentUser.email);
      form.setValue('username', currentUser.username);
    }
  }, [form, currentUser]);

  return (
    <div className="w-full flex flex-col items-start px-6">
      <Form {...form}>
        <form
          className="w-full space-y-8 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
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
                  Your Dribbble URL: https://dribbble.com/{field.value}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
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
          <Button className="self-end rounded-full">Saves Change</Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
