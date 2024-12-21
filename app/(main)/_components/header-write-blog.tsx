'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import { Account } from './account';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ChevronLeft, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogStore } from '@/store/blogStore';

interface HeaderWriteBlogProps {}

const HeaderWriteBlog: FunctionComponent<HeaderWriteBlogProps> = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const {
    setOpenDialogPublish,
    setWriteBlog,
    writeBlog,
    openDialogDraft,
    setOpenDialogDraft,
  } = blogStore();
  return (
    <div className="fixed lg:px-12 px-2 z-50 overflow-x-hidden inset-0 flex items-center justify-between bg-white dark:bg-gray-800 w-full h-[75px]">
      <div className="flex items-center gap-x-2">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex items-center text-sm text-muted-foreground font-medium rounded-full"
        >
          <ChevronLeft />
          <p>Back</p>
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-3">
          <Button
            onClick={() => {
              setOpenDialogPublish(true);
              setWriteBlog({ published: true });
            }}
            className="rounded-full"
            disabled={!!!writeBlog.content}
          >
            <PenLine className="h-[16px] w-[16px]" />
            <p>Publish Blog</p>
          </Button>
          <Button
            disabled={!!!writeBlog.content}
            variant="outline"
            onClick={() => setOpenDialogDraft(true)}
          >
            Save Draft
          </Button>
        </div>
        {isLoading ? (
          <div className="animate-pulse h-[50px] w-[50px] rounded-full bg-gray-300"></div>
        ) : user ? (
          <Account />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderWriteBlog;
