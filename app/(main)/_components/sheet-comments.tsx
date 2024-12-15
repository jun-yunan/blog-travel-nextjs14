import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Comment } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CommentField from './comment-field';
import Editor from '../write-blog/_components/editor';

interface SheetCommentsProps {
  children?: React.ReactNode;
  comments: Comment[];
}

const formComments = z.object({
  content: z.string(),
});

export function SheetComments({ children, comments }: SheetCommentsProps) {
  const form = useForm<z.infer<typeof formComments>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(formComments),
  });

  const onSubmit = async (data: z.infer<typeof formComments>) => {};

  const { openSheetComments, setOpenSheetComments } = useBlogStore();

  return (
    <Sheet open={openSheetComments} onOpenChange={setOpenSheetComments}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-[2000px] h-full flex flex-col gap-y-4">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            Comments are a great way to interact with the author and other
            readers.
          </SheetDescription>
        </SheetHeader>
        <Card className="flex flex-col items-start gap-y-4 w-full min-h-[100px] p-4">
          {comments.length === 0 ? (
            <div>
              <p>No comments yet.</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.content}</p>
              </div>
            ))
          )}
        </Card>
        <CommentField onSubmit={() => {}} />
        {/* <Card className="w-full">
          <form onSubmit={form.handleSubmit(onSubmit)}>
          </form>
        </Card> */}
      </SheetContent>
    </Sheet>
  );
}
