'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FunctionComponent, useEffect } from 'react';

interface FormAuthProps {
  variant: 'sign-in' | 'sign-up';
}

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const formAuthSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(50, { message: 'Username must not exceed 50 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    })
    .refine((val) => !/\s/.test(val), {
      message: 'Username must not contain spaces',
    }),
  email: z.string().email(),
  password: z
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

const FormAuth: FunctionComponent<FormAuthProps> = ({ variant }) => {
  const router = useRouter();
  const {
    mutate: fetchAuth,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof formAuthSchema>) => {
      if (variant === 'sign-up') {
        return await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
          { ...values, username: `@${values.username}` },
        );
      } else {
        return await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          },
        );
      }
    },
    onMutate: async (values: z.infer<typeof formAuthSchema>) => {
      console.log(values);
    },
    onSuccess(data, variables, context) {
      if (variant === 'sign-up') {
        toast.success('Account created successfully');
        router.push('/sign-in');
        form.reset();
        console.log(data);
      } else {
        toast.success('Signed in successfully');
        router.push('/dashboard');
        console.log(data);
        form.reset();
      }
    },
    onError(error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error('An error occurred');
      }
    },
  });
  const form = useForm<z.infer<typeof formAuthSchema>>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(formAuthSchema),
  });

  const onSubmit = async (values: z.infer<typeof formAuthSchema>) => {
    return fetchAuth(values);
  };

  useEffect(() => {
    if (variant === 'sign-in') {
      form.setValue('username', 'aaaaaaa');
    }
  }, [form, variant]);

  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle>{variant === 'sign-in' ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {variant === 'sign-in'
            ? 'Sign in to your account'
            : 'Create an account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {variant === 'sign-up' && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@shadcn"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Your username must be unique and contain at least 3
                      characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="**********"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 8 characters long, contain at
                    least one uppercase letter, one lowercase letter, one
                    number, and one special character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {variant === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
            <Label className="">
              {variant === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account?'}
              <Link
                href={variant === 'sign-in' ? '/sign-up' : '/sign-in'}
                className="text-blue-500"
              >
                {variant === 'sign-in' ? 'Sign Up' : 'Sign In'}
              </Link>
            </Label>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormAuth;
