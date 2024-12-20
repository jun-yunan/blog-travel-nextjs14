'use client';

import { updateUserPassword } from '@/services/user';
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
import { formPassword } from '@/schema/form';
import { userStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface PasswordPageProps {}

const PasswordPage: FunctionComponent<PasswordPageProps> = () => {
  const form = useForm<z.infer<typeof formPassword>>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(formPassword),
  });

  const { user } = userStore();

  const {
    mutate: updatePassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['edit-password'],
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
      form.reset();
    },
    onError(error, variables, context) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    },
  });

  const onSubmit = (data: z.infer<typeof formPassword>) => {
    updatePassword({ data, userId: user?.id || '' });
  };

  return (
    <div className="w-full flex flex-col items-start px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Old Password</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[44px] text-lg"
                    type="password"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">New Password</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[44px] text-lg"
                    type="password"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters long, contain at least
                  one uppercase letter, one lowercase letter, one number, and
                  one special character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center justify-end gap-x-4">
            <Button
              disabled={isPending}
              className="rounded-full"
              type="button"
              variant="ghost"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button disabled={isPending} className="rounded-full" type="submit">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordPage;
