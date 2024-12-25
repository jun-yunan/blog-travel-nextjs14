import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bookmark, PencilLine, Pin, Trash2 } from 'lucide-react';
import { FunctionComponent } from 'react';
import { blogStore } from '@/store/blogStore';
import { useDeleteBlog } from '@/hooks/useDeleteBlog';
import { useRouter } from 'next/navigation';

interface DropdownMenuBlogProps {
  children?: React.ReactNode;
  blogId: string;
}

const DropdownMenuBlog: FunctionComponent<DropdownMenuBlogProps> = ({
  children,
  blogId,
}) => {
  const { onOpenChange, setBlogId } = useDeleteBlog();

  const router = useRouter();

  const handleDeleteBlog = () => {
    setBlogId(blogId);
    onOpenChange(true);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Blog</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/edit-blog/${blogId}`)}>
          <PencilLine />
          <p>Edit Blog</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bookmark />
          <p>Save Blog</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pin />
          <p>Pin Blog</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteBlog}>
          <Trash2 className="h-4 w-4" />
          <p>Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuBlog;
