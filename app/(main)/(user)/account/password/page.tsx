'use client';

import { updateUserPassword } from '@/api/user';
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
import { useUserStore } from '@/hooks/useUserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface PasswordPageProps {}

export const formPassword = z.object({
  oldPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must not exceed 50 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&#^()-_=+]/, {
      message: 'Password must contain at least one special character',
    }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(50, { message: 'Password must not exceed 50 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&#^()-_=+]/, {
      message: 'Password must contain at least one special character',
    }),
});

const PasswordPage: FunctionComponent<PasswordPageProps> = () => {
  const form = useForm<z.infer<typeof formPassword>>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(formPassword),
  });

  const { user } = useUserStore();

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
    updatePassword({ data, userId: user?._id || '' });
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
          <Button
            disabled={isPending}
            className="self-end"
            size="lg"
            type="submit"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PasswordPage;
