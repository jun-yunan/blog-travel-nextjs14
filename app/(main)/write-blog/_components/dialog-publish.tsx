'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBlogStore } from '@/hooks/useBlogStore';
import { formCreateBlog } from '@/schema/form';
import { ImagePlus, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface DialogPublishProps {
  isPending?: boolean;
  form: UseFormReturn<z.infer<typeof formCreateBlog>>;
  submitRef: RefObject<HTMLButtonElement>;
  setCoverImage?: Dispatch<SetStateAction<File | null>>;
}

export function DialogPublish({
  form,
  submitRef,
  isPending,
  setCoverImage,
}: DialogPublishProps) {
  const [image, setImage] = useState<File | null>(null);

  const { openDialogPublish, setOpenDialogPublish, writeBlog } = useBlogStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <Dialog open={openDialogPublish} onOpenChange={setOpenDialogPublish}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Preview and publish your blog</DialogTitle>
          <DialogDescription>
            Before publishing, make sure your blog looks good.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full flex items-center gap-x-6">
          <Card className="w-[60%] h-full">
            <CardHeader>
              <CardTitle>{form.getValues('title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full h-[200px]">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: writeBlog.content || '',
                  }}
                />
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="w-[40%] h-full flex flex-col items-center justify-center overflow-hidden">
            {image ? (
              <div className="w-full h-full relative ">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="cover"
                  width={200}
                  height={200}
                  ref={imageRef}
                  quality={100}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-70"
                  onClick={() => inputRef.current?.click()}
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setImage(null);
                    setCoverImage?.(null);
                    imageRef.current!.src = '';
                    if (inputRef.current) {
                      inputRef.current.value = '';
                    }
                  }}
                  className="absolute top-0 right-0 z-10"
                >
                  <Trash2 className="text-rose-600" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" onClick={() => inputRef.current?.click()}>
                <ImagePlus />
                <p>Cover Photo</p>
              </Button>
            )}
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files![0];
                if (file) {
                  setImage(file);
                  setCoverImage?.(file);
                }
              }}
            />
          </Card>
        </div>
        <FormField
          control={form.control}
          disabled={isPending}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter travel topics (e.g., Beach, Mountain, Adventure...)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add tags to your blog to help readers find it.
              </FormDescription>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => submitRef?.current?.click()}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Publish'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
