'use client';
import { getAllBlogByAuthor, getBlogById } from '@/api/blog';
import { useQuery } from '@tanstack/react-query';
import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreVertical,
  Share,
  ThumbsUp,
} from 'lucide-react';
import { FunctionComponent, useEffect } from 'react';
import Renderer from '../../_components/renderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { HoverCard } from '@radix-ui/react-hover-card';
import { HoverCardProfile } from '../../_components/hover-card-profile';
import Link from 'next/link';
import ButtonInteractBlog from '../../(user)/profile/_components/button-interact-blog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Author } from '@/types/blog';
import { Button } from '@/components/ui/button';
import useFooterStore from '@/store/footerStore';
import { cn } from '@/lib/utils';
import { SheetComments } from '../../_components/sheet-comments';
import { useBlogStore } from '@/hooks/useBlogStore';

interface BlogDetailsProps {
  params: {
    blogId: string;
  };
}

const BlogDetails: FunctionComponent<BlogDetailsProps> = ({ params }) => {
  const isFooterVisible = useFooterStore((state) => state.isFooterVisible);

  const { setOpenSheetComments } = useBlogStore();

  const {
    data: blog,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['blog', params.blogId],
    queryFn: () => getBlogById({ blogId: params.blogId }),
  });

  const { data: blogsByAuthor } = useQuery({
    queryKey: ['blogs-by-author', blog?.author._id],
    queryFn: () => getAllBlogByAuthor({ authorId: blog?.author._id || '' }),
    enabled: !!blog?.author._id,
  });

  // const { data: blogsByTag} = useQuery({
  //   queryKey: ['blogs-by-tag', blog?.tags],
  //   queryFn: () => getAllBlogByTag({ tag: blog?.tags || '' }),
  //   enabled: !!blog?.tags,
  // })

  return (
    <>
      {blog && <SheetComments comments={blog.comments} />}
      <div className="my-10 w-full flex justify-center">
        <div className="lg:w-[25%] relative lg:flex flex-col items-start hidden">
          {blog && (
            <div
              className={cn(
                'flex flex-col items-start gap-y-4 p-6 fixed overflow-hidden',
                isFooterVisible && 'hidden',
              )}
            >
              <div className="flex items-center gap-x-2">
                <HoverCardProfile<Author> information={blog.author}>
                  <Avatar className="w-11 h-11 cursor-pointer hover:opacity-75 transition-all duration-300">
                    <AvatarImage
                      src={blog.author.imageUrl}
                      className="object-cover"
                      alt={blog.author.username}
                    />
                    <AvatarFallback>
                      <Loader2 className="animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                </HoverCardProfile>
                <div className="flex flex-col items-start justify-around">
                  <Link
                    href={`/${blog.author.username}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {blog.author.username}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
                  </p>
                </div>
              </div>
              {blog.author.bio && (
                <div className="w-[300px] flex items-start justify-center flex-wrap">
                  <p className="text-muted-foreground text-sm">
                    {blog.author.bio}
                  </p>
                </div>
              )}
              <Separator />
              <div>
                <Button className="rounded-full" variant="ghost" size="default">
                  <Heart />
                  <p>19</p>
                </Button>
                {/* <SheetComments comments={blog.comments}> */}
                <Button
                  onClick={() => setOpenSheetComments(true)}
                  className="rounded-full"
                  variant="ghost"
                  size="default"
                >
                  <MessageCircle />
                  <p>19</p>
                </Button>
                {/* </SheetComments> */}
                <Button className="rounded-full" variant="ghost" size="default">
                  <Share />
                  <p>19</p>
                </Button>
              </div>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="w-full flex flex-col justify-center items-center h-[650px]">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {isError && (
          <div className="w-full flex flex-col justify-center items-center h-[650px]">
            <p>
              There was an error. Please try again later or contact the support.
            </p>
          </div>
        )}
        {isSuccess && blog && (
          <Card className="flex flex-col p-6 lg:w-[50%] w-[90%] items-start gap-y-8">
            <div className="self-start">
              <h1 className="text-3xl font-semibold ">{blog.title}</h1>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <HoverCardProfile<Author> information={blog.author}>
                  <Avatar className="w-11 h-11 cursor-pointer hover:opacity-75 transition-all duration-300">
                    <AvatarImage
                      src={blog.author.imageUrl}
                      className="object-cover"
                      alt={blog.author.username}
                    />
                    <AvatarFallback>
                      <Loader2 className="animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                </HoverCardProfile>

                <div className="flex flex-col items-start justify-around">
                  <Link
                    href={`/${blog.author.username}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {blog.author.username}
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <Bookmark className="h-5 w-5 hover:opacity-50 cursor-pointer" />
                <MoreVertical className="h-5 w-5 hover:opacity-50 cursor-pointer" />
              </div>
            </div>
            <div className="">
              <Renderer value={blog.content} />
            </div>
            <div className="lg:w-[60%] w-full lg:self-start flex items-center justify-around">
              <ButtonInteractBlog label="Like" onClick={() => {}}>
                <Heart />
              </ButtonInteractBlog>
              <ButtonInteractBlog label="Comment" onClick={() => {}}>
                <MessageCircle />
              </ButtonInteractBlog>
              <ButtonInteractBlog label="Share" onClick={() => {}}>
                <Share />
              </ButtonInteractBlog>
            </div>
            <div className="flex items-center gap-x-2 flex-wrap">
              {blog.tags.map((tag, index) => (
                <Badge variant="outline" key={index}>
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">BLOG BY THE SAME AUTHOR</p>
              <div className="flex flex-col gap-y-2 items-start p-2">
                {blogsByAuthor?.map((blog) => (
                  <Link
                    className="text-blue-500 hover:underline text-sm"
                    href={`/blogs/${blog._id}`}
                    key={blog._id}
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">
                {`Other related articles`.toUpperCase()}
              </p>
              <div className="flex flex-col gap-y-2 items-start p-2">
                {blogsByAuthor?.map((blog) => (
                  <Link
                    className="text-blue-500 hover:underline text-sm"
                    href={`/blogs/${blog._id}`}
                    key={blog._id}
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="lg:w-[25%] lg:flex hidden"></div>
      </div>
    </>
  );
};

export default BlogDetails;
