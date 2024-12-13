import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Blog } from '@/types/blog';
import {
  Bookmark,
  EllipsisVertical,
  Loader2,
  MessageCircle,
  PencilLine,
  Pin,
  Share,
  ThumbsUp,
  Trash2,
} from 'lucide-react';
import { FunctionComponent } from 'react';
import { useBlogStore } from '@/hooks/useBlogStore';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@/components/ui/scroll-area';
import DropdownMenuBlog from './dropdown-menu-blog';
import { DialogDeleteBlog } from './dialog-delete-blog';
import { HoverCardProfile } from '@/app/(main)/_components/hover-card-profile';
import ButtonInteractBlog from './button-interact-blog';

interface CardBlogProps {
  blog: Blog;
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const CardBlog: FunctionComponent<CardBlogProps> = ({ blog }) => {
  return (
    <>
      <DialogDeleteBlog blogId={blog._id} />

      <Card className="w-full overflow-hidden flex flex-col">
        <div className="w-full flex items-center justify-between p-5">
          <div className="flex items-center gap-x-3">
            <HoverCardProfile>
              <Avatar className="w-[54px] h-[54px]">
                <AvatarImage
                  src={blog.author.imageUrl}
                  className="object-cover hover:opacity-75 cursor-pointer"
                />
                <AvatarFallback>
                  <Loader2 className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            </HoverCardProfile>
            <div className="flex flex-col items-start gap-y-1">
              <p className="text-base font-semibold">{blog.author.username}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
              </p>
            </div>
          </div>
          <DropdownMenuBlog>
            <EllipsisVertical className="h-5 w-5" />
          </DropdownMenuBlog>
        </div>
        <CardContent className="min-h-[100px] gap-y-4 flex flex-col items-start">
          <CardTitle>{blog.title}</CardTitle>
          <ScrollArea className="h-[150px]">
            <Renderer value={blog.content} />
          </ScrollArea>
        </CardContent>
        <div className="w-full flex items-center justify-between px-4 py-1">
          <Button variant="ghost" className="text-base rounded-full">
            <ThumbsUp />
            <p>12</p>
          </Button>
          <div className="flex items-center gap-x-3">
            <Button variant="ghost" className="text-base rounded-full">
              <MessageCircle />
              <p>12</p>
            </Button>
            <Button variant="ghost" className="text-base rounded-full">
              <Share />
              <p>12</p>
            </Button>
          </div>
        </div>
        <Separator className="w-full" />
        <div className="w-full py-2 flex items-center justify-around">
          <ButtonInteractBlog label="Like" onClick={() => {}}>
            <ThumbsUp />
          </ButtonInteractBlog>
          <ButtonInteractBlog label="Comment" onClick={() => {}}>
            <MessageCircle />
          </ButtonInteractBlog>
          <ButtonInteractBlog label="Share" onClick={() => {}}>
            <Share />
          </ButtonInteractBlog>
        </div>
      </Card>
    </>
  );
};

export default CardBlog;
