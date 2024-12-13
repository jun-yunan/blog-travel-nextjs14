import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBlogStore } from '@/hooks/useBlogStore';
import { Bookmark, PencilLine, Pin, Trash2 } from 'lucide-react';
import { FunctionComponent } from 'react';

interface DropdownMenuBlogProps {
  children: React.ReactNode;
}

const DropdownMenuBlog: FunctionComponent<DropdownMenuBlogProps> = ({
  children,
}) => {
  const { setOpenDialogDelete } = useBlogStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Blog</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
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
        <DropdownMenuItem onClick={() => setOpenDialogDelete(true)}>
          <Trash2 className="h-4 w-4" />
          <p>Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuBlog;
