'use client';

import React, { FunctionComponent } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import { usePathname } from 'next/navigation';
import { ChatPopover } from './_components/chat-popover';
import HeaderWriteOrEditBlog from './_components/header-write-or-edit-blog';

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: FunctionComponent<LayoutMainProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-x-hidden">
      {pathname === '/write-blog' || pathname.startsWith('/edit-blog') ? (
        <HeaderWriteOrEditBlog
          variant={
            pathname === '/write-blog'
              ? 'write'
              : pathname.startsWith('/edit-blog')
                ? 'edit'
                : null
          }
        />
      ) : (
        <Header />
      )}
      <main className="w-full mt-[75px] flex flex-col items-center">
        {children}
      </main>
      <Footer />
      {/* <ChatPopover /> */}
    </div>
  );
};

export default LayoutMain;
