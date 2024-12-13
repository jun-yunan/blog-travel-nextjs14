import { deleteBlogById } from '@/api/blog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useBlogStore } from '@/hooks/useBlogStore';
import { queryClient } from '@/providers/tanstack-query-provider';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface DialogDeleteBlogProps {
  blogId: string;
}

export function DialogDeleteBlog({ blogId }: DialogDeleteBlogProps) {
  const { openDialogDelete, setOpenDialogDelete } = useBlogStore();
  const { mutate: mutationDeleteBlog, isPending } = useMutation({
    mutationKey: ['delete-blog'],
    mutationFn: deleteBlogById,
    onSuccess(data, variables, context) {
      toast.success('Blog post deleted successfully');
      setOpenDialogDelete(false);
      queryClient.invalidateQueries({
        queryKey: ['currentUser', 'blogs'],
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
    <AlertDialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this blog post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBlog} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
