'use client';
import {
  getAllBlogByAuthor,
  getBlogById,
  getBlogByTag,
  likeBlog,
  unlikeBlog,
} from '@/api/blog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreVertical,
  Share,
} from 'lucide-react';
import { FunctionComponent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
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
import { getCurrentUser } from '@/api/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { queryClient } from '@/providers/tanstack-query-provider';
import dynamic from 'next/dynamic';
import { blogStore } from '@/store/blogStore';

interface BlogDetailsProps {
  params: {
    blogId: string;
  };
}

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

const BlogDetails: FunctionComponent<BlogDetailsProps> = ({ params }) => {
  const isFooterVisible = useFooterStore((state) => state.isFooterVisible);

  const { setOpenSheetComments } = blogStore();

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

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser', 'user'],
    queryFn: getCurrentUser,
  });

  const { data: blogsByTag } = useQuery({
    queryKey: ['blogs-by-tag', blog?.tags],
    queryFn: () => getBlogByTag({ tags: blog?.tags || [] }),
    enabled: !!blog?.tags,
  });

  const { mutate: mutationLikeBlog, isSuccess: isLiked } = useMutation({
    mutationKey: ['like', blog?._id],
    mutationFn: likeBlog,
    onSuccess: () => {
      toast.success('Liked blog successfully');
      queryClient.invalidateQueries({
        queryKey: ['blog', params.blogId],
      });
    },
    onError(error, variables, context) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.response?.data);
      } else {
        toast.error('An error occurred. Please try again later');
      }
    },
  });

  const {} = useMutation({
    mutationKey: ['unlike', blog?._id],
    mutationFn: unlikeBlog,
  });

  const handleLikeBlog = () => {
    if (blog) mutationLikeBlog({ blogId: blog._id });
  };

  return (
    <>
      {blog && currentUser && (
        <SheetComments
          blogId={params.blogId}
          comments={blog.comments}
          author={blog.author}
          user={currentUser}
        />
      )}
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
                    href={`/profile/${blog.author.username}`}
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
                <Button
                  onClick={handleLikeBlog}
                  className="rounded-full"
                  variant="ghost"
                  size="default"
                >
                  {blog.likes.some(
                    (like) => like.user._id === currentUser?._id,
                  ) ? (
                    <FaHeart className="text-rose-500" />
                  ) : (
                    <Heart />
                  )}
                  <p>{blog.likes.length}</p>
                </Button>
                {/* <SheetComments comments={blog.comments}> */}
                <Button
                  onClick={() => setOpenSheetComments(true)}
                  className="rounded-full"
                  variant="ghost"
                  size="default"
                >
                  <MessageCircle />
                  <p>{blog.comments.length}</p>
                </Button>
                {/* </SheetComments> */}
                <Button className="rounded-full" variant="ghost" size="default">
                  <Share />
                  <p>{blog.shares.length}</p>
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
                    href={`/profile/${blog.author.username}`}
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
              <ButtonInteractBlog label="Like" onClick={handleLikeBlog}>
                {blog.likes.some(
                  (like) => like.user._id === currentUser?._id,
                ) ? (
                  <FaHeart className="text-rose-500" />
                ) : (
                  <Heart />
                )}
              </ButtonInteractBlog>
              <ButtonInteractBlog
                label="Comment"
                onClick={() => setOpenSheetComments(true)}
              >
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
                {blogsByTag?.map((blog) => (
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
