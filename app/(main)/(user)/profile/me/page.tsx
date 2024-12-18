'use client';

import { getAllBlogByUser } from '@/api/blog';
import { getCurrentUser } from '@/api/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

import { FunctionComponent } from 'react';
import CardBlog from '../_components/card-blog';
import { useRouter } from 'next/navigation';

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const router = useRouter();

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
    queryFn: getAllBlogByUser,
  });
  return (
    <div className="lg:w-[60%] w-full flex flex-col gap-y-6">
      {Array.isArray(blogs) && blogs.length !== 0 ? (
        blogs.map((blog) => <CardBlog key={blog._id} blog={blog} />)
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
              You have no blog yet, click the button below to create your first
              blog
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
