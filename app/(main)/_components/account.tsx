import {
  Bell,
  Bookmark,
  CreditCard,
  Github,
  LifeBuoy,
  Loader2,
  LogOut,
  MessageCircle,
  NotebookPen,
  PenLine,
  Settings,
  User,
  User2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user';
import { Button } from '@/components/ui/button';
import { ToggleTheme } from './toggle-theme';

export function Account() {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });
  return (
    <div className="flex items-center">
      <ToggleTheme />
      <Button variant="ghost">
        <MessageCircle />
      </Button>
      <Button variant="ghost">
        <Bell />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user?.imageUrl ? (
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                className="object-cover"
                src={user.imageUrl}
                alt={`@${user.username}`}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src="" alt={`@${user?.username}`} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/write-blog')}>
              <PenLine />
              <span>Write blog</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NotebookPen />
              <span>My blog</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark />
              <span>Saved blog</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // router.prefetch('/accounts');
              router.push('/account');
            }}
          >
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
