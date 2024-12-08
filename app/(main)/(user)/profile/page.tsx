'use client';

import { getCurrentUser } from '@/api/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader2, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { FunctionComponent } from 'react';

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { data: user } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });
  return (
    <div className="w-[75%] h-[1500px]">
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/pexels-binh-ho-image-355440-1018478.jpg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover flex-shrink-0 rounded-xl"
        />
        <div className="absolute -bottom-[35px] left-[75px] gap-x-6 flex items-center">
          {user?.imageUrl ? (
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage
                src={user.imageUrl}
                alt={`@${user.username}`}
                className="object-cover"
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage className="object-cover" />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-3xl font-semibold text-gray-700 self-end">
              {user?.username}
            </p>
            <p>{user?.bio}</p>
          </div>
        </div>
      </div>
      <div className="mt-[100px] flex w-full h-full">
        <div className="flex-1 bg-cyan-200">
          <Card>
            <CardHeader>
              <CardTitle>Introduce</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersRound />
              <p></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>no recent activity</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 bg-yellow-300"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
