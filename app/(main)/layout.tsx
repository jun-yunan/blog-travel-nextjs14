'use client';

import React, { FunctionComponent } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';
import { usePathname } from 'next/navigation';
import HeaderWriteBlog from './_components/header-write-blog';

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: FunctionComponent<LayoutMainProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-full flex flex-col items-center">
      {pathname === '/write-blog' ? <HeaderWriteBlog /> : <Header />}
      <main className="w-full mt-[75px] flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutMain;
