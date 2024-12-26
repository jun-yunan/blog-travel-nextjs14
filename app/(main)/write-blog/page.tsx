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
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { createBlog } from '@/services/blog';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formCreateBlog } from '@/schema/form';
import Quill from 'quill';
import { Card } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { blogStore } from '@/store/blogStore';
import DialogDraft from '../_components/dialog-draft';
import { DialogPublish } from '../_components/dialog-publish';

interface WriteBlogProps {}

const Editor = dynamic(() => import('@/app/(main)/_components/editor'), {
  ssr: false,
});

const WriteBlog: FunctionComponent<WriteBlogProps> = () => {
  const editorRef = useRef<Quill | null>(null);

  const [coverImage, setCoverImage] = useState<File | null>(null);

  const submitRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formCreateBlog>>({
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
    resolver: zodResolver(formCreateBlog),
  });
  const { setOpenDialogPublish, setOpenDialogDraft, blog, setBlog } =
    blogStore();

  const { mutate: mutationCreateBlog, isPending } = useMutation({
    mutationKey: ['create-blog'],
    mutationFn: createBlog,
    onSuccess(data, variables, context) {
      toast.success('Blog published successfully!');
      editorRef.current?.setContents([]);
      form.reset();
      setOpenDialogPublish(false);
      setOpenDialogDraft(false);
      setBlog({ content: '', tags: [], title: '', published: false });
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
    mutationCreateBlog({
      data,
      published: blog.published || false,
      coverImage,
    });
  };

  const title = form.watch('title');

  useEffect(() => {
    setBlog({ title });
  }, [setBlog, title]);

  return (
    <div className="w-full h-[1500px] flex flex-col items-center mb-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:w-[60%] w-[90%] h-full flex flex-col gap-y-6"
        >
          <DialogDraft submitRef={submitRef} isPending={isPending} />
          <DialogPublish
            setCoverImage={setCoverImage}
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
            <Card className="w-full h-full">
              <Editor
                variant="write"
                innerRef={editorRef}
                onSubmit={() => {}}
                form={form}
              />
            </Card>
          </div>
          <button type="submit" ref={submitRef} className="hidden"></button>
        </form>
      </Form>
    </div>
  );
};

export default WriteBlog;
