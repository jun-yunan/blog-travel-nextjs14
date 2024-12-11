import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Blog } from '@/types/blog';
import { EllipsisVertical, MessageCircle, Share, ThumbsUp } from 'lucide-react';
import { FunctionComponent } from 'react';

interface CardBlogProps {
  blog: Blog;
}

const CardBlog: FunctionComponent<CardBlogProps> = ({ blog }) => {
  return (
    <Card className="w-full overflow-hidden flex flex-col">
      <div className="w-full flex items-center justify-between p-5">
        <CardTitle>{blog.title}</CardTitle>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </div>
      <CardContent className="min-h-[130px]">
        <p className="truncate">{blog.content}</p>
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
        <Button
          variant="ghost"
          size="lg"
          className="text-base font-medium rounded-full"
        >
          <ThumbsUp />
          <p>Like</p>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="text-base font-medium rounded-full"
        >
          <MessageCircle />
          <p>Comment</p>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="text-base font-medium rounded-full"
        >
          <Share />
          <p>Share</p>
        </Button>
      </div>
    </Card>
  );
};

export default CardBlog;
