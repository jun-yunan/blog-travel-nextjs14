'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePicker } from '../../_components/date-picker';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUser, updateProfileUserById } from '@/api/user';
import { useUserStore } from '@/hooks/useUserStore';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { queryClient } from '@/providers/tanstack-query-provider';
import { CloudUpload, Loader2, Trash2, User } from 'lucide-react';
import { DialogUploadImage } from '../../_components/dialog-upload-image';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditProfileProps {}

export const formEditProfile = z.object({
  name: z.string().max(50).optional(),
  location: z.string().max(300).optional(),
  bio: z
    .string()
    .max(300, {
      message: 'Bio must be less than 300 characters',
    })
    .optional(),
  personalWebsite: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
});

const EditProfile: FunctionComponent<EditProfileProps> = () => {
  const [date, setDate] = useState<Date>();

  const { setOpenDialogUploadImage } = useUserStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const {
    mutate: updateProfile,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['edit-profile'],
    mutationFn: updateProfileUserById,
    onSuccess: () => {
      toast.success('Profile updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['currentUser', 'user'] });
    },
    onError(error, variables, context) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    },
  });

  const form = useForm<z.infer<typeof formEditProfile>>({
    defaultValues: {
      name: '',
      location: '',
      bio: '',
      personalWebsite: '',
      dateOfBirth: new Date(),
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue('bio', user.bio);
      form.setValue('dateOfBirth', user.dateOfBirth);
      form.setValue('location', user.location);
      form.setValue('name', user.name);
      form.setValue('personalWebsite', user.personalWebsite);
      setDate(user.dateOfBirth);
    }
  }, [user, form]);

  const onSubmit = (values: z.infer<typeof formEditProfile>) => {
    if (user?._id) {
      updateProfile({ userId: user._id, data: values });
    } else {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <DialogUploadImage />
      <div className="w-full flex flex-col items-start px-6">
        <div className="flex items-center gap-6">
          {user?.imageUrl ? (
            <Avatar className="w-[75px] h-[75px]">
              <AvatarImage
                src={user.imageUrl}
                className="object-cover"
                alt={`@${user.username}`}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-[75px] h-[75px]">
              <AvatarImage
                src=""
                className="object-cover"
                alt={`@${user?.username}`}
              />
              <AvatarFallback>
                {/* <Loader2 className="animate-spin" /> */}
                <User />
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex items-center gap-x-4">
            <Button
              variant="outline"
              onClick={() => setOpenDialogUploadImage(true)}
            >
              <CloudUpload /> Upload new picture
            </Button>
            <Button variant="destructive">
              <Trash2 /> Delete
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6 w-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[44px] text-lg"
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.getValues('name')?.length === 0
                      ? '0'
                      : form.getValues('name')?.length}
                    /50 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Location</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[44px] text-lg"
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.getValues('location')?.length === 0
                      ? '0'
                      : form.getValues('location')?.length}
                    /300 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} rows={5} />
                  </FormControl>
                  <FormDescription>
                    Briefly describe yourself in a few words.{' '}
                    {form.getValues('bio')?.length === 0
                      ? '0'
                      : form.getValues('bio')?.length}
                    /300 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalWebsite"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Personal Website</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[44px] text-lg"
                      type="text"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your home page, blog, or company site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DatePicker
              isLoading={isLoading}
              date={date}
              setDate={setDate}
              form={form}
            />
            <Button disabled={isPending} className="mt-6 rounded-full self-end">
              Save Profile
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
