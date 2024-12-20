import { deleteBlogById } from '@/services/blog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteBlog } from '@/hooks/useDeleteBlog';
import { queryClient } from '@/providers/tanstack-query-provider';
import { blogStore } from '@/store/blogStore';
import { Blog } from '@/types/blog';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

interface DialogDeleteBlogProps {
  username: string;
  children?: React.ReactNode;
}

export function DialogDeleteBlog({
  children,
  username,
}: DialogDeleteBlogProps) {
  const router = useRouter();
  const { onOpenChange, open, blogId } = useDeleteBlog();
  const { mutate: mutationDeleteBlog, isPending } = useMutation({
    mutationKey: ['delete-blog'],
    mutationFn: deleteBlogById,
    onSuccess(data, variables, context) {
      toast.success('Blog post deleted successfully');
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ['blogs-by-username', username],
      });
    },
    onError(error, variables, context) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred delete blog. Please try again later');
      }
    },
  });
  const handleDeleteBlog = () => {
    mutationDeleteBlog({ blogId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this blog post?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteBlog}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
