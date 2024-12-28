import { Card } from '@/components/ui/card';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Comment } from '@/types/comment';
import React, { useEffect, useRef } from 'react';
import CommentField, { EditorValue } from './comment-field';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '@/services/comment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { queryClient } from '@/providers/tanstack-query-provider';
import CommentItem from './comment-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from '@/types/user';
import { blogStore } from '@/store/blogStore';
import Quill from 'quill';

interface SheetCommentsProps {
  children?: React.ReactNode;
  comments: Comment[];
  blogId: string;
  author: User;
  user: User;
  username?: string;
}

export function SheetComments({
  children,
  comments,
  blogId,
  author,
  user,
  username,
}: SheetCommentsProps) {
  const { openSheetComments, setOpenSheetComments } = blogStore();

  const commentFieldRef = useRef<Quill | null>(null);

  const commentEndRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLInputElement>(null);

  const { mutate: mutationCreateComment, isPending } = useMutation({
    mutationKey: ['comments', 'create'],
    mutationFn: createComment,
    onError(error, variables, context) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    },
    onSuccess(data, variables, context) {
      // toast.success('Comment created successfully.');
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
      queryClient.invalidateQueries({
        queryKey: ['blogs-by-username', username],
      });
      commentFieldRef.current?.setContents([]);
    },
  });

  const onSubmit = async (data: EditorValue) => {
    console.log(data);

    mutationCreateComment({
      data,
      blogId,
    });
  };

  const scrollToBottom = () => {
    commentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <Sheet open={openSheetComments} onOpenChange={setOpenSheetComments}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="w-[80%] h-full flex flex-col gap-y-4">
        <SheetHeader className="w-full flex flex-col items-start">
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription className="text-start">
            Comments are a great way to interact with the author and other
            readers.
          </SheetDescription>
        </SheetHeader>
        <Card className="w-full max-h-[324px] p-4">
          {comments.length === 0 ? (
            <div>
              <p>No comments yet.</p>
            </div>
          ) : (
            <ScrollArea className="w-full h-full flex flex-col items-start gap-y-10">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  blogId={blogId}
                  isAuthorComment={user.id === author.id}
                  comment={comment}
                />
              ))}
              <div ref={commentEndRef} />
            </ScrollArea>
          )}
        </Card>
        <CommentField
          // imageElementRef={imageElementRef}
          innerRef={commentFieldRef}
          disabled={isPending}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}
