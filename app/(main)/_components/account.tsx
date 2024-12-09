import {
  Bookmark,
  CreditCard,
  Github,
  LifeBuoy,
  Loader2,
  LogOut,
  NotebookPen,
  PenLine,
  Settings,
  User,
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

export function Account() {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user?.imageUrl ? (
          <Avatar>
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
          <Avatar>
            <AvatarImage src="" alt={`@${user?.username}`} />
            <AvatarFallback>
              <Loader2 className="animate-spin" />
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
          <DropdownMenuItem>
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
  );
}
