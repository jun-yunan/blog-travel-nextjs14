import { CalendarDays, Link2, Loader2, Mail, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user';
import { format } from 'date-fns';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HoverCardProfileProps {
  children: React.ReactNode;
}
export function HoverCardProfile({ children }: HoverCardProfileProps) {
  const { data: user, isSuccess } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        {isSuccess && user ? (
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={user.imageUrl} className="object-cover" />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{user.username}</h4>
              <div className="flex items-center gap-x-1">
                <Mail className="h-4 w-4 opacity-70" />
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Link
                href={user.personalWebsite || ''}
                className="text-sm text-blue-500 hover:underline flex items-center gap-x-1"
              >
                <Link2 className="h-4 w-4" />
                {user.personalWebsite || 'No personal website'}
              </Link>
              <div className="flex items-center gap-x-1">
                <UserRound className="h-4 w-4 opacity-70 self-start" />
                <ScrollArea className="h-16 w-full">
                  <p className="text-sm text-muted-foreground text-ellipsis">
                    {user.bio || 'This user has no bio yet.'}
                  </p>
                </ScrollArea>
              </div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Member since {format(new Date(user.createdAt), 'dd-MM-yyyy')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
