'use client';

import React, { FunctionComponent } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import { usePathname } from 'next/navigation';
import HeaderWriteBlog from './_components/header-write-blog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/app-sidebar';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChatPopover } from './_components/chat-popover';

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: FunctionComponent<LayoutMainProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-x-hidden">
      {pathname === '/write-blog' ? <HeaderWriteBlog /> : <Header />}
      <main className="w-full mt-[75px] flex flex-col items-center">
        {children}
      </main>
      <Footer />
      <ChatPopover />
    </div>
  );
};

export default LayoutMain;
