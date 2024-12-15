'use client';

import { FunctionComponent } from 'react';
import BlogOutstanding from './_components/blog-outstanding';
import { useQuery } from '@tanstack/react-query';
import { getAllBlog } from '@/api/blog';
import { Loader2 } from 'lucide-react';
import BlogItem from './_components/blog-item';

interface BlogsPageProps {}

const BlogsPage: FunctionComponent<BlogsPageProps> = () => {
  const {
    data: blogs,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlog,
  });
  return (
    <div className="lg:w-[70%] w-[90%] mb-10 flex flex-col items-center">
      <div className="self-start flex flex-col gap-y-4 my-8">
        <h1 className="text-3xl font-bold">Courtside: The Dribbble Blog</h1>
        <p>
          Stay up to date with the latest news and stories from the Dribbble
          community.
        </p>
      </div>
      <div>
        <BlogOutstanding />
      </div>
      <div className="w-full flex flex-col gap-y-6">
        {isLoading && <Loader2 className="animate-spin" />}
        {isError && <p>There was an error</p>}
        {isSuccess &&
          blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogsPage;
