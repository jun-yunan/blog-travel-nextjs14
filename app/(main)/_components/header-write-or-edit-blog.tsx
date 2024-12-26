'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import { Account } from './account';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { ChevronLeft, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blogStore } from '@/store/blogStore';
import Link from 'next/link';

type VariantBlog = 'write' | 'edit' | null;

interface HeaderWriteOrEditBlogProps {
  variant?: VariantBlog;
}

const HeaderWriteOrEditBlog: FunctionComponent<HeaderWriteOrEditBlogProps> = ({
  variant,
}) => {
  const router = useRouter();
  const { setOpenDialogPublish, setOpenDialogDraft, setBlog, blog } =
    blogStore();
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
              setBlog({ published: true });
            }}
            disabled={blog.content && blog.title ? false : true}
          >
            <PenLine className="h-5 w-5" />
            <p>Publish Blog</p>
          </Button>
          <Button
            disabled={blog.content && blog.title ? false : true}
            variant="outline"
            onClick={() => {
              setOpenDialogDraft(true);
              setBlog({ published: false });
            }}
          >
            Save Draft
          </Button>
        </div>
        <SignedOut>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="rounded-full text-sm font-medium"
            >
              Sign in
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Account />
        </SignedIn>
      </div>
    </div>
  );
};

export default HeaderWriteOrEditBlog;
