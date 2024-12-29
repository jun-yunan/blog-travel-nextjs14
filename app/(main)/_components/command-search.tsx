import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchBlog } from '@/services/blog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { format } from 'date-fns';
import Link from 'next/link';
import { HoverCardProfile } from './hover-card-profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import dynamic from 'next/dynamic';

const Renderer = dynamic(() => import('@/app/(main)/_components/renderer'), {
  ssr: false,
});

export function CommandSearch({
  onOpen,
  open,
}: {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchText, setSearchText] = useState('');

  const searchTextDebounce = useDebounce(searchText, 500);

  console.log(searchTextDebounce);

  const {
    data: resultSearchBlogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['search', searchTextDebounce],
    queryFn: () => searchBlog({ searchText: searchTextDebounce }),
    enabled: !!searchTextDebounce,
  });

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Card className="md:min-w-[450px] min-h-[200px] max-h-[500px] overflow-hidden p-3 flex flex-col gap-y-6">
      <div className="flex items-center px-3 border rounded-lg">
        <Search className="h-4 w-4" />
        <Input
          value={searchText}
          onChange={handleValueChange}
          placeholder="Search blogs..."
          className="w-full focus-visible:ring-0 border-none shadow-none"
        />
      </div>
      <ScrollArea className="w-full h-full">
        <div className="w-full flex flex-col gap-y-3 h-full">
          {isLoading && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Loader2 className="animate-spin" />
              <p>Search...</p>
            </div>
          )}
          {resultSearchBlogs?.length === 0 && !isLoading ? (
            <p>No results found. Please try another search.</p>
          ) : (
            resultSearchBlogs?.map((blog) => (
              <Link
                href={`/blogs/${blog.id}`}
                className="flex flex-col gap-y-2 border rounded-lg p-2 hover:bg-gray-100 transition-all duration-300"
                key={blog.id}
                onClick={() => onOpen(false)}
              >
                <div className="flex items-center gap-x-2">
                  <HoverCardProfile information={blog.author}>
                    <Avatar>
                      <AvatarImage
                        src={blog.author.imageUrl}
                        alt={blog.author.username}
                        className="object-cover"
                      />
                      <AvatarFallback>{blog.author.username}</AvatarFallback>
                    </Avatar>
                  </HoverCardProfile>
                  <div className="flex flex-col items-start justify-around">
                    <Link
                      href={`/profile/${blog.author.username}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {blog.author.username}
                    </Link>
                    <p className="text-muted-foreground text-sm font-light">
                      {format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                <div className="max-h-[100px] overflow-hidden w-full flex flex-col items-center">
                  <p className="text-base font-normal">{blog.title}</p>
                  <Renderer value={blog.content} />
                </div>
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
