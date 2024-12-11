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
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Loader2 } from 'lucide-react';
import { RefObject } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface DialogPublishProps {
  isPending?: boolean;
  form: UseFormReturn<
    {
      title: string;
      content: string;
      tags?: string[] | undefined;
    },
    unknown,
    undefined
  >;
  submitRef: RefObject<HTMLButtonElement>;
}

export function DialogPublish({
  form,
  submitRef,
  isPending,
}: DialogPublishProps) {
  const { openDialogPublish, setOpenDialogPublish, writeBlog } = useBlogStore();
  return (
    <Dialog open={openDialogPublish} onOpenChange={setOpenDialogPublish}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Preview and publish your blog</DialogTitle>
          <DialogDescription>
            Before publishing, make sure your blog looks good.
          </DialogDescription>
        </DialogHeader>
        <Card>
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
                  // disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                Add tags to your blog to help readers find it.
              </FormDescription>
              <FormMessage />
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
