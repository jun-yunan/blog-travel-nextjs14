'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunctionComponent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Editor from './_components/editor';
import { useBlogStore } from '@/hooks/useBlogStore';
import { useMutation } from '@tanstack/react-query';
import { createBlog } from '@/api/blog';
import axios from 'axios';
import { toast } from 'react-toastify';
import DialogDraft from './_components/dialog-draft';
import { DialogPublish } from './_components/dialog-publish';

interface WriteBlogProps {}

export const formCreateBlog = z.object({
  title: z.string().min(1),
  content: z.string(),
  tags: z.optional(
    z.string().transform((tags) => tags.split(',').map((tag) => tag.trim())),
  ),
});

const WriteBlog: FunctionComponent<WriteBlogProps> = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formCreateBlog>>({
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
    resolver: zodResolver(formCreateBlog),
  });
  const { openDialogPublish, setOpenDialogPublish, writeBlog } = useBlogStore();

  const {
    mutate: mutationCreateBlog,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['create-blog'],
    mutationFn: createBlog,
    onSuccess(data, variables, context) {
      toast.success('Blog published successfully!');
      setOpenDialogPublish(false);
    },
    onError(error, variables, context) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    },
  });

  const onSubmit = (data: z.infer<typeof formCreateBlog>) => {
    console.log(data);
    mutationCreateBlog({ data, published: true });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[80%] flex flex-col items-center mx-auto h-[1500px]"
        >
          <DialogDraft />
          <DialogPublish
            isPending={isPending}
            form={form}
            submitRef={submitRef}
          />
          <div className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full h-[75px] border-none shadow-none focus-visible:ring-0 md:text-3xl placeholder:text-3xl focus:text-3xl"
                      type="text"
                      placeholder="Title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full h-full flex gap-x-6">
            <div className="w-full h-full">
              <Editor onSubmit={() => {}} form={form} />
            </div>
          </div>
          <button type="submit" ref={submitRef} className="hidden"></button>
        </form>
      </Form>
    </>
  );
};

export default WriteBlog;
