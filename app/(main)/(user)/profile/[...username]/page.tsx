'use client';

import { getAllBlogByUsername } from '@/services/blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import {
  Loader2,
  PencilLine,
  UserRound,
  UserRoundPen,
  UsersRound,
} from 'lucide-react';
import { FunctionComponent, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCurrentUser, getUserByUsername } from '@/services/user';
import CardBlogProfile from '../_components/card-blog-profile';
import { DialogDeleteBlog } from '../_components/dialog-delete-blog';

interface ProfileByUsernameProps {
  params: {
    username: string;
  };
}

const ProfileByUsername: FunctionComponent<ProfileByUsernameProps> = ({
  params,
}) => {
  const router = useRouter();

  const username = useMemo(
    () => decodeURIComponent(params.username),
    [params.username],
  );

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const { data: userByUsername } = useQuery({
    queryKey: ['user-by-username', username],
    queryFn: () => getUserByUsername(username),
    enabled: !!username,
  });

  const user = useMemo(
    () =>
      currentUser?.id === userByUsername?.id ? currentUser : userByUsername,
    [currentUser, userByUsername],
  );

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs-by-username', username],
    queryFn: () => getAllBlogByUsername({ username }),
  });

  return (
    <>
      <DialogDeleteBlog username={username} />
      <div className="w-[70%] mb-10">
        <Card className="w-full overflow-hidden flex flex-col items-start gap-y-10">
          <div className="relative w-full h-[300px]">
            <Image
              src="/images/pexels-binh-ho-image-355440-1018478.jpg"
              alt=""
              width={1920}
              height={1080}
              className="w-full h-full object-cover flex-shrink-0"
            />
            <div className="absolute -bottom-[0px] left-[75px] gap-x-4 flex items-center">
              {user?.imageUrl ? (
                <Avatar className="w-[150px] h-[150px] border-4 border-white">
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
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          <div className="pb-4 w-full h-[88px] flex items-center justify-between">
            <div className="w-[500px] gap-y-2 pl-[75px] overflow-hidden flex flex-col items-start">
              <p className="text-3xl font-semibold">{user?.username}</p>
              <ScrollArea className="w-full h-[88px]">
                <p className="">{user?.bio}</p>
              </ScrollArea>
            </div>
            <div className="flex items-center gap-x-4 px-4">
              <Button
                variant="outline"
                onClick={() => router.push('/write-blog')}
                className="rounded-lg"
              >
                <PencilLine />
                <p>Write Blog</p>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/account/edit-profile')}
                className="rounded-lg"
              >
                <UserRoundPen />
                <p> Edit Profile</p>
              </Button>
            </div>
          </div>
        </Card>
        <div className="mt-10 flex w-full h-full gap-x-6 ">
          <div className="w-[40%] lg:flex flex-col gap-y-4 hidden">
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
          <div className="lg:w-[60%] w-full flex flex-col gap-y-6">
            {!!blogs && blogs.length !== 0 ? (
              blogs.map((blog, index) => (
                <CardBlogProfile key={index} blog={blog} username={username} />
              ))
            ) : isLoading ? (
              <Card className="animate-pulse w-full flex flex-col items-start gap-y-6 p-6">
                <div className="animate-pulse flex flex-col items-start w-full gap-y-2">
                  <div className="w-[50%] h-[15px] bg-slate-300"></div>
                  <div className="w-full h-[15px] bg-slate-300"></div>
                </div>
                <div className="animate-pulse w-full h-[150px] bg-slate-300"></div>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Blog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    You have no blog yet, click the button below to create your
                    first blog
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileByUsername;
