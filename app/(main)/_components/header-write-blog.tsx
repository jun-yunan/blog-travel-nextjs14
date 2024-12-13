'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import { Account } from './account';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ChevronLeft, PenLine } from 'lucide-react';
import { useBlogStore } from '@/hooks/useBlogStore';
import { useRouter } from 'next/navigation';

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
  } = useBlogStore();
  return (
    <div className="fixed z-50 flex items-center justify-between px-12 w-full h-[75px]">
      <div className="flex items-center gap-x-2">
        <Logo />
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex items-center text-sm text-muted-foreground font-medium rounded-full"
        >
          <ChevronLeft />
          <p>Back</p>
        </Button>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-x-3">
          <div
            onClick={() => {
              setOpenDialogPublish(true);
              setWriteBlog({ published: true });
            }}
            className="flex items-center cursor-pointer gap-x-2 bg-purple-200 text-purple-700 hover:bg-purple-600 transition-all duration-300 hover:text-white text-sm font-semibold py-2 px-4 rounded-lg"
          >
            <PenLine className="h-[16px] w-[16px]" />
            <p>Publish Blog</p>
          </div>
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
