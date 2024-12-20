import {
  CalendarDays,
  Check,
  Link2,
  Mail,
  MessageSquareMore,
  Plus,
  UserPlus,
  UserRound,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { User } from '@/types/user';
import { format } from 'date-fns';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/user';

type HoverCardProfileProps<T> = {
  children: React.ReactNode;
  information: T;
};
export function HoverCardProfile<T extends User>({
  children,
  information,
}: HoverCardProfileProps<T>) {
  const [isFollow, setIsFollow] = useState(false);
  const handleFollow = () => {
    setIsFollow((prev) => !prev);
  };

  const {
    data: currentUser,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: () => getCurrentUser(),
  });

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 overflow-hidden flex flex-col">
        <div className="flex justify-start space-x-4">
          <Avatar className="hover:opacity-75 cursor-pointer transition-all duration-300">
            <AvatarImage src={information.imageUrl} className="object-cover" />
            <AvatarFallback>{information.username}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex items-center gap-x-6">
              <Link
                href={`/profile/${information.username}`}
                className="text-sm font-semibold hover:underline"
              >
                {information.username}
              </Link>

              {currentUser?.id !== information.id && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center justify-center gap-x-1"
                  onClick={handleFollow}
                >
                  {isFollow ? (
                    <Check className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  <p className={cn(`text-sm`, isFollow && 'text-blue-600')}>
                    follow
                  </p>
                </Button>
              )}
            </div>
            <div className="flex items-center gap-x-1">
              <Mail className="h-4 w-4 opacity-70" />
              <p className="text-sm text-muted-foreground">
                {information.email}
              </p>
            </div>
            <Link
              href={information.personalWebsite || ''}
              className="text-sm text-blue-500 overflow-hidden hover:underline flex items-center gap-x-1"
            >
              <Link2 className="h-4 w-4" />
              <p className="text-ellipsis">
                {information.personalWebsite || 'No personal website'}
              </p>
            </Link>
            <div className="flex items-center gap-x-1">
              <UserRound className="h-4 w-4 opacity-70 self-start" />
              <ScrollArea className="h-16">
                <p className="text-sm text-muted-foreground text-ellipsis">
                  {information.bio || 'This user has no bio yet.'}
                </p>
              </ScrollArea>
            </div>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Member since
                {format(new Date(information.createdAt), 'dd-MM-yyyy')}
              </span>
            </div>
          </div>
        </div>
        {currentUser && currentUser.id !== information.id && (
          <Separator className="mt-4" />
        )}
        {currentUser && currentUser.id !== information.id && (
          <div className="w-full flex justify-around items-center mt-4">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center justify-center gap-x-1"
              onClick={() => {}}
            >
              <MessageSquareMore />
              <p className="text-sm">Message</p>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center justify-center gap-x-1"
              onClick={() => {}}
            >
              <UserPlus />
              <p className="text-sm">Add Friend</p>
            </Button>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
