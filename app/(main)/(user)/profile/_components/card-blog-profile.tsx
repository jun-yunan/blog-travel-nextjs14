import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Blog } from '@/types/blog';
import {
  EllipsisVertical,
  Heart,
  Loader2,
  MessageCircle,
  Share,
  UserRound,
} from 'lucide-react';
import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { ScrollArea } from '@/components/ui/scroll-area';
import DropdownMenuBlog from './dropdown-menu-blog';
import { HoverCardProfile } from '@/app/(main)/_components/hover-card-profile';
import ButtonInteractBlog from './button-interact-blog';
import Link from 'next/link';
import { SheetComments } from '@/app/(main)/_components/sheet-comments';
import { User } from '@/types/user';
import { Badge } from '@/components/ui/badge';

interface CardBlogProfileProps {
  blog: Blog;
  username: string;
  isCurrentUser: boolean;
  currentUser: User;
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const CardBlogProfile: FunctionComponent<CardBlogProfileProps> = ({
  blog,
  username,
  currentUser,
  isCurrentUser,
}) => {
  return (
    <Card className="w-full overflow-hidden flex flex-col">
      <div className="flex items-center p-3 justify-between flex-shrink-0">
        <div className="flex items-center gap-x-2">
          <HoverCardProfile information={blog.author}>
            {blog.author.imageUrl ? (
              <Avatar>
                <AvatarImage
                  src={blog.author.imageUrl}
                  className="object-cover hover:opacity-75 cursor-pointer"
                />
                <AvatarFallback>
                  <Loader2 className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="hover:opacity-75 cursor-pointer">
                <AvatarImage className="object-cover " />
                <AvatarFallback>
                  <UserRound />
                </AvatarFallback>
              </Avatar>
            )}
          </HoverCardProfile>
          <div className="flex flex-col items-start gap-y-1 max-w-[250px]">
            <div className="flex items-center gap-x-3">
              <Link
                href={`/${blog.author.username}`}
                className="text-sm hover:underline font-semibold truncate"
              >
                {blog.author.username}
              </Link>
              {blog.published ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant="outline">Draft</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
        </div>
        {isCurrentUser && (
          <DropdownMenuBlog blogId={blog.id}>
            <EllipsisVertical className="h-4 w-4" />
          </DropdownMenuBlog>
        )}
      </div>
      <Link href={`/blogs/${blog.id}`}>
        <CardContent className="min-h-[100px] gap-y-4 flex flex-col items-start">
          <CardTitle>{blog.title}</CardTitle>
          <ScrollArea className="h-[150px]">
            <Renderer value={blog.content} />
          </ScrollArea>
          <p className="text-blue-500 text-sm hover:underline">Read more</p>
        </CardContent>
      </Link>
      <div className="w-full flex items-center justify-between px-4 py-1">
        <Button variant="ghost" className="text-base rounded-full">
          <Heart />
          <p>{blog.likes.length}</p>
        </Button>
        <div className="flex items-center gap-x-3">
          <Button variant="ghost" className="text-base rounded-full">
            <MessageCircle />
            <p>{blog.comments.length}</p>
          </Button>
          <Button variant="ghost" className="text-base rounded-full">
            <Share />
            <p>{blog.shares.length}</p>
          </Button>
        </div>
      </div>
      <Separator className="w-full" />
      <div className="w-full py-2 flex items-center justify-around">
        <ButtonInteractBlog label="Like" onClick={() => {}}>
          <Heart />
        </ButtonInteractBlog>
        <SheetComments
          comments={blog.comments}
          user={currentUser}
          blogId={blog.id}
          author={blog.author}
          username={username}
        >
          <ButtonInteractBlog label="Comment" onClick={() => {}}>
            <MessageCircle />
          </ButtonInteractBlog>
        </SheetComments>
        <ButtonInteractBlog label="Share" onClick={() => {}}>
          <Share />
        </ButtonInteractBlog>
      </div>
    </Card>
  );
};

export default CardBlogProfile;
