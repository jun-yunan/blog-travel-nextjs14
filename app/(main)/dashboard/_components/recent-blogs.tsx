import { db } from '@/lib/db';
import React from 'react';
import CardBlog from './card-blog';
import Link from 'next/link';

type Props = {};

const RecentBlogs = async (props: Props) => {
  const recentBlogs = await db.blog.findMany({
    where: {
      authorId: '676760ae0ecaacd0430a642c',
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className="w-[50%] flex flex-col h-full items-start">
      <div className="lg:mb-[35px] mb-1 lg:text-3xl text-xl font-medium leading-tight">
        Recent Blogs
      </div>
      <div className="flex flex-col items-center w-full h-full lg:gap-y-14 gap-y-4">
        {recentBlogs &&
          recentBlogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <CardBlog title={blog.title} imageSrc={blog.imageUrl || ''} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
