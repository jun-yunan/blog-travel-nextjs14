import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Comment } from '@/types/comment';
import { Loader2 } from 'lucide-react';
import { FunctionComponent } from 'react';

import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import dynamic from 'next/dynamic';

interface CommentItemProps {
  comment: Comment;
  isAuthorComment?: boolean;
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const CommentItem: FunctionComponent<CommentItemProps> = ({
  comment,
  isAuthorComment = false,
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex items-start gap-x-2">
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
        <Card className="flex w-full p-2 flex-col items-start justify-around">
          {isAuthorComment && <Badge variant="outline">Author</Badge>}
          <Link
            href={`/${comment.user.username}`}
            className="text-sm font-semibold hover:underline"
          >
            {comment.user.username}
          </Link>
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
