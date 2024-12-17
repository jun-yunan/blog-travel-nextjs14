import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Author, Blog } from '@/types/blog';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { HoverCardProfile } from '../../_components/hover-card-profile';
import { format } from 'date-fns';
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Share,
  ThumbsUp,
} from 'lucide-react';
import ButtonInteractBlog from '../../(user)/profile/_components/button-interact-blog';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';

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
          <HoverCardProfile<Author> information={blog.author}>
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
              href={`/${blog.author.username}`}
              className="text-sm font-semibold hover:underline"
            >
              {blog.author.username}
            </Link>
            <p className="text-muted-foreground text-sm">
              {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
        </div>
        <div>
          <MoreVertical className="h-5 w-5" />
        </div>
      </div>
      <Link href={`/blogs/${blog._id}`}>
        <p className="text-lg font-semibold hover:text-purple-500 transition-all duration-300">
          {blog.title}
        </p>
        <div className="w-full hover:bg-slate-100 p-2 rounded hover:bg-opacity-75 max-h-[200px] overflow-hidden">
          <Renderer value={blog.content} />
        </div>
      </Link>
      <Link
        href={`/blogs/${blog._id}`}
        className="text-sm font-medium text-blue-500 hover:underline"
      >
        Read more...
      </Link>
      {/* <Separator />
      <div className="w-full flex items-center justify-around">
        <ButtonInteractBlog label="Like" onClick={() => {}}>
          <Heart />
        </ButtonInteractBlog>
        <ButtonInteractBlog label="Comment" onClick={() => {}}>
          <MessageCircle />
        </ButtonInteractBlog>
        <ButtonInteractBlog label="Share" onClick={() => {}}>
          <Share />
        </ButtonInteractBlog>
      </div> */}
    </Card>
  );
};

export default BlogItem;
