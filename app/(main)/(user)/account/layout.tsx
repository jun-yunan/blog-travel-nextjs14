'use client';

import { FunctionComponent, useEffect } from 'react';
import SidebarSettings from '../_components/sidebar-settings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { Crown, Loader2, UserRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user';
import { userStore } from '@/store/userStore';

interface LayoutSettingsProps {
  children: React.ReactNode;
}

const LayoutSettings: FunctionComponent<LayoutSettingsProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const { setUser } = userStore();
  const {
    data: currentUser,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, setUser]);
  return (
    <div className="w-[60%] mt-10 h-[1500px] flex flex-col items-start gap-y-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          {currentUser?.imageUrl ? (
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage
                className="object-cover"
                src={currentUser.imageUrl}
                alt={`@${currentUser.username}`}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage src="" alt={`@${currentUser?.username}`} />
              <AvatarFallback>
                {/* <Loader2 className="animate-spin" /> */}
                <UserRound />
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col items-start justify-around">
            <p className="text-lg font-semibold">
              {isError ? '' : currentUser?.username} {pathname}
            </p>
            <p className="text-base font-light text-gray-600">
              Update your username and manage your account
            </p>
          </div>
        </div>
        <div className="text-white flex items-center justify-center py-2 px-6 rounded-lg bg-yellow-400 gap-x-2 cursor-pointer">
          <Crown />
          <p className="text-base font-medium">Upgrade Account</p>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <SidebarSettings />
        {children}
      </div>
    </div>
  );
};

export default LayoutSettings;
