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
import { CloudUpload, Trash2 } from 'lucide-react';

interface EditProfileProps {}

export const formEditProfile = z.object({
  name: z.string().max(50).optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  personalWebsite: z.string().url().optional(),
  dateOfBirth: z.date().optional(),
});

const EditProfile: FunctionComponent<EditProfileProps> = () => {
  const [date, setDate] = useState<Date>();

  const { data: user } = useQuery({
    queryKey: ['profile'],
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
      queryClient.invalidateQueries({ queryKey: ['profile', 'user'] });
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
    <div className="w-full flex flex-col items-start px-6">
      <div className="flex items-center gap-6">
        <div className="w-[75px] h-[75px] rounded-full bg-purple-300"></div>
        <div className="flex items-center gap-x-4">
          <Button variant="outline">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} rows={5} />
                </FormControl>
                <FormDescription>
                  Brief description for your profile. URLs are hyperlinked.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalWebsite"
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
          <DatePicker date={date} setDate={setDate} form={form} />
          <Button disabled={isPending} className="mt-6 rounded-full self-end">
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
