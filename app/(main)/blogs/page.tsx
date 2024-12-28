'use client';

import { FunctionComponent, useMemo } from 'react';
import BlogOutstanding from './_components/blog-outstanding';
import { useQuery } from '@tanstack/react-query';
import { getAllBlog } from '@/services/blog';
import { Loader2 } from 'lucide-react';
import BlogItem from './_components/blog-item';
import { PaginationBlogs } from '../_components/pagination_blogs';
import { useSearchParams } from 'next/navigation';

interface BlogsPageProps {}

const BlogsPage: FunctionComponent<BlogsPageProps> = () => {
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    return searchParams.get('page') || 1;
  }, [searchParams]);

  const {
    data: blogs,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getAllBlog({ page: Number(page) }),
  });
  return (
    <div className="lg:w-[70%] w-[90%] mb-10 flex flex-col items-center">
      <div className="self-start flex flex-col gap-y-4 my-8">
        <h1 className="text-3xl font-bold">Courtside: The Dribbble Blog</h1>
        {/* <h1 className="text-3xl font-bold">{page}</h1> */}
        <p>
          Stay up to date with the latest news and stories from the Dribbble
          community.
        </p>
      </div>
      <div>
        <BlogOutstanding />
      </div>
      <div className="w-full flex flex-col gap-y-6 my-6">
        {isLoading && <Loader2 className="animate-spin" />}
        {isError && <p>There was an error</p>}
        {isSuccess &&
          blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
      </div>
      <PaginationBlogs />
    </div>
  );
};

export default BlogsPage;
