import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Comment } from '@/types/comment';
import { Edit2, Loader2, MoreHorizontal, Trash2, User } from 'lucide-react';
import { FunctionComponent, useState } from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { deleteCommentById } from '@/services/comment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { queryClient } from '@/providers/tanstack-query-provider';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CommentItemProps {
  comment: Comment;
  isAuthorComment?: boolean;
  blogId: string;
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const CommentItem: FunctionComponent<CommentItemProps> = ({
  comment,
  isAuthorComment = false,
  blogId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { mutate: mutationDeleteComment, isPending } = useMutation({
    mutationKey: ['delete-comment', comment.id],
    mutationFn: deleteCommentById,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later');
      }
    },
    onSuccess(data, variables, context) {
      toast.success('Comment deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['blog', blogId],
      });
      setOpenDialog(false);
    },
  });

  const handleDeleteComment = async () => {
    mutationDeleteComment({ commentId: comment.id });
  };
  const handleEditComment = async () => {};

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex items-start gap-x-2">
        {comment.user.imageUrl ? (
          <Avatar>
            <AvatarImage
              src={comment.user.imageUrl}
              alt={comment.user.username}
              className="object-cover"
            />
            <AvatarFallback>
              <Loader2 className="animate-spin" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage
              src=""
              alt={comment.user.username}
              className="object-cover"
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        )}
        <Card className="flex w-full p-2 flex-col items-start justify-around">
          {isAuthorComment && <Badge variant="outline">Author</Badge>}
          <div className="w-full flex items-center justify-between">
            <Link
              href={`/${comment.user.username}`}
              className="text-sm font-semibold hover:underline"
            >
              {comment.user.username}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4 hover:opacity-70 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Comment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit2 />
                  <p>Edit</p>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpenDialog(true)}>
                  <Trash2 />
                  <p>Delete</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteComment}>
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="w-full">
            <Renderer value={comment.content} />
          </div>
          {comment.imageUrl && (
            <Image
              src={comment.imageUrl}
              alt=""
              className="object-cover w-[200px] h-[300px] rounded-lg cursor-pointer hover:opacity-75"
              quality={100}
              width={200}
              height={300}
            />
          )}
        </Card>
      </div>
      <div className="w-full flex items-center justify-start gap-x-2">
        <p className="text-sm text-muted-foreground">
          {format(new Date(comment.createdAt), 'dd-MM-yyyy HH:mm')}
        </p>
        <Button variant="ghost" className="rounded-full" size="sm">
          <p className="text-sm font-semibold">Like</p>
        </Button>
        <Button variant="ghost" className="rounded-full" size="sm">
          <p className="text-sm font-semibold">Reply</p>
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;
