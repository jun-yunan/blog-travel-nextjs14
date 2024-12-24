import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Blog } from '@/types/blog';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { HoverCardProfile } from '../../_components/hover-card-profile';
import { format } from 'date-fns';
import { Bookmark, MoreVertical } from 'lucide-react';

import dynamic from 'next/dynamic';
import { User } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface BlogItemProps {
  blog: Blog;
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const BlogItem: FunctionComponent<BlogItemProps> = ({ blog }) => {
  return (
    <Card className="flex flex-col items-start p-6 gap-y-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <HoverCardProfile<User> information={blog.author}>
            <Avatar className="hover:opacity-75 transition-all duration-300 w-11 h-11 cursor-pointer">
              <AvatarImage
                src={blog.author.imageUrl}
                alt={blog.author.username}
                className="object-cover"
              />
              <AvatarFallback>{blog.author.username}</AvatarFallback>
            </Avatar>
          </HoverCardProfile>
          <div className="flex flex-col items-start justify-around">
            <Link
              href={`/profile/${blog.author.username}`}
              className="text-sm font-semibold hover:underline"
            >
              {blog.author.username}
            </Link>
            <p className="text-muted-foreground text-sm">
              {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Bookmark /> Save Blog
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link
        className="w-full flex items-start gap-x-3 p-2 h-[300px] rounded-lg transition-all duration-300 hover:bg-slate-100"
        href={`/blogs/${blog.id}`}
      >
        {/* {blog.imageUrl && (
          <Image
            className="w-[300px] h-full object-cover rounded-lg"
            src={blog.imageUrl}
            // fill
            alt=""
          />
        )} */}
        <div className="flex flex-col h-full w-full items-start">
          <p className="text-lg font-semibold hover:text-purple-500">
            {blog.title}
          </p>
          <div className="w-full p-2 rounded hover:bg-opacity-75 h-full overflow-hidden">
            <Renderer value={blog.content} />
          </div>
        </div>
      </Link>
      <Link
        href={`/blogs/${blog.id}`}
        className="text-sm font-medium text-blue-500 hover:underline"
      >
        Read more...
      </Link>
    </Card>
  );
};

export default BlogItem;
