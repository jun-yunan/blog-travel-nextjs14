'use client';

import { getAllBlog } from '@/api/blog';
import { getCurrentUser } from '@/api/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Loader2, UsersRound } from 'lucide-react';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import CardBlog from './_components/card-blog';

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { data: user } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const {
    data: blogs,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['currentUser', 'blogs'],
    queryFn: getAllBlog,
  });
  return (
    <div className="w-[75%] h-[1500px]">
      <Card className="w-full overflow-hidden flex flex-col items-start gap-y-10">
        <div className="relative w-full h-[300px]">
          <Image
            src="/images/pexels-binh-ho-image-355440-1018478.jpg"
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover flex-shrink-0"
          />
          <div className="absolute -bottom-[35px] left-[75px] gap-x-6 flex items-center">
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
                  <Loader2 className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        <div className="ml-[75px] pb-4">
          <p className="text-3xl font-semibold text-gray-700 self-end">
            {user?.username}
          </p>
          <p>{user?.bio}</p>
        </div>
      </Card>
      <div className="mt-10 flex w-full h-full gap-x-6">
        <div className="w-[40%] flex flex-col gap-y-4">
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
        <div className="w-[60%]">
          {Array.isArray(blogs) && blogs && isSuccess ? (
            blogs.map((blog) => <CardBlog key={blog._id} blog={blog} />)
          ) : (
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent>
                <p>no blog</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
